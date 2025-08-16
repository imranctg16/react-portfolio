// Real blog post data from the blog-posts directory
export const blogPosts = [
  {
    id: 1,
    title: "MySQL 'Server Has Gone Away' Investigation & Fix",
    date: "2024-12-10",
    readTime: "15 min read",
    category: "Database",
    excerpt: "How we solved random 'SQLSTATE[HY000]: General error: 2006 MySQL server has gone away' errors that were driving us crazy in production. A deep dive into the root cause discovery, reproduction, and implementation of a smart solution.",
    challenge: "We were getting random 'MySQL server has gone away' errors in production - not consistently, just randomly enough to make debugging a nightmare. Only occurred sometimes (maybe 1 in 50 requests) with no obvious pattern or trigger.",
    solution: "Discovered that our scheduled cleanup process was killing active database connections from other services. Fixed by implementing intelligent filtering that only kills truly idle connections (5+ minutes) instead of all sleeping connections.",
    technologies: ["MySQL", "Laravel", "PHP", "Docker", "Database Architecture"],
    hero: {
      gifSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      liveUrl: "#",
      githubUrl: "#"
    },
    outcomes: [
      "Identified root cause: scheduled process killing active DB connections",
      "Created reproduction test case to prove the theory",
      "Implemented smart filtering with configurable thresholds (5+ minute minimum)",
      "Added comprehensive logging for monitoring and debugging",
      "Zero MySQL connection errors since deployment"
    ],
    story: `# MySQL "Server Has Gone Away" Investigation & Fix

## The Problem That Drove Me Crazy

We were getting random \`SQLSTATE[HY000]: General error: 2006 MySQL server has gone away\` errors in production. Not consistently - just randomly enough to make debugging a nightmare.

**Error Pattern:**

- Happened during ticket service operations
- Only occurred sometimes (maybe 1 in 50 requests)
- No obvious pattern or trigger
- Stack traces pointed to database operations inside transactions

**Production Error Example:**

\`\`\`
SQLSTATE[HY000]: General error: 2006 MySQL server has gone away (SQL: select * from \`tickets\` where \`tickets\`.\`id\` = 189713 limit 1)

#0 /var/www/html/app/Services/TransitionService.php(856): updateTicket()
#1 /var/www/html/app/Services/TransitionFieldValueService.php(914): storeWithRepeater()

\`\`\`

## Architecture Overview

\`\`\`
┌─────────────────────┐                    ┌──────────────────────┐
│  Notification       │    API Calls       │  Ticket Service      │
│  Service            │ ──────────────────> │                      │
│                     │                    │  • Transitions       │
│  • Scheduled Jobs   │                    │  • DB Transactions   │
│  • Kill Process ⚠️   │                    │  • Business Logic    │
└─────────────────────┘                    └──────────────────────┘
          │                                           │
          │                                           │
          └───────────── Shared MySQL Server ────────┘
                         common-mysql
                    ┌─────────────────────┐
                    │ • notification_db   │
                    │ • ticket_service_db │
                    └─────────────────────┘

\`\`\`

## The Root Cause Discovery

### The Smoking Gun

Found this in our notification service (scheduled every minute):

\`\`\`php
// NotificationService.php - The Culprit!
public function killSleepProcess($type = null)
{
    $results = DB::connection('mysql')->select(DB::raw("SHOW processlist"));
    foreach ($results as $result) {
        if ($result->Command == "Sleep") {
            DB::connection('mysql')->select(DB::raw("KILL $result->Id"));
        }
    }
}

\`\`\`

**What this was doing:**

- Running every 60 seconds via cron
- Killing ALL sleeping connections on the MySQL server
- Not just notification service connections - EVERYTHING
- Including active ticket service operations that briefly went idle

### The Sequence

\`\`\`
1. Notification Job Dispatched
   ├─> API call to Ticket Service

2. Ticket Service Processing
   ├─> DB::beginTransaction()
   ├─> Complex business logic
   ├─> Connection goes "idle" for 30 seconds (normal)

3. Kill Process Execution (runs every minute)
   ├─> Sees "Sleep" connection from Ticket Service
   ├─> KILL [connection_id]
   ├─> Connection murdered mid-transaction

4. Ticket Service Resumes
   ├─> Tries to execute SQL query
   ├─> Connection is dead
   ├─> ❌ "MySQL server has gone away"
   ├─> ❌ Cannot auto-reconnect (inside transaction)
   ├─> ❌ Transaction fails and rolls back

\`\`\`

### Auto Reconnect Failure

\`\`\`php
// This works - Laravel auto-reconnects
DB::select('SELECT * FROM tickets WHERE id = 123');

// This fails - no auto-reconnect inside transactions
DB::beginTransaction();
sleep(60); // Connection gets killed here
DB::select('SELECT * FROM tickets WHERE id = 123'); // ❌ MySQL gone away
DB::commit(); // ❌ This fails too

\`\`\`

**Reason:** Laravel prevents auto-reconnection during transactions to maintain data integrity and prevent partial transaction states.

## Reproducing the Issue

### Test Case Setup

I created a reproduction job to prove the theory:

\`\`\`php
<?php
// GoneAwayReproJob.php
class GoneAwayReproJob implements ShouldQueue
{
    public int $timeout = 300; // Prevent worker timeout

    public function handle(): void
    {
        try {
            // Start transaction to prevent auto-reconnection
            DB::beginTransaction();

            // Get our connection ID
            $connId = DB::select('SELECT CONNECTION_ID() as id')[0]->id;
            Log::warning('[REPRO] Connection ID: ' . $connId);

            // Sleep long enough for kill process to find us
            sleep(90);
            Log::warning('[REPRO] Woke up from sleep, testing connection...');

            // This should fail if connection was killed
            $result = DB::select('SELECT 1 as test');

            DB::commit();
            Log::warning('[REPRO] Success - no connection issues!');

        } catch (\\Throwable $e) {
            Log::error('[REPRO] Got the expected error: ' . $e->getMessage());
            throw $e;
        }
    }
}

\`\`\`

### Test Results

**Before Fix:**

\`\`\`
[REPRO] Connection ID: 1234
[REPRO] Woke up from sleep, testing connection...
[ERROR] Got the expected error: SQLSTATE[HY000]: General error: 2006 MySQL server has gone away

\`\`\`

**After Fix:**

\`\`\`
[REPRO] Connection ID: 1234
[REPRO] Woke up from sleep, testing connection...
[REPRO] Success - no connection issues!

\`\`\`

## The Solution

### Smart Kill Process Implementation

Instead of killing ALL sleeping connections, implemented intelligent filtering:

\`\`\`php
<?php
// Fixed NotificationService.php
public function killSleepProcess($type = null, $limit = null)
{
    $results = DB::connection('mysql')->select(DB::raw("SHOW processlist"));
    if (!empty($type)) {
        return $this->sendResponse($results, 'All processlist');
    }

    $killedCount = 0;
    $minimumSleepTime = $limit ? (int)$limit * 60 : 300; // Default 5 minutes

    foreach ($results as $result) {
        if ($result->Command == "Sleep") {
            // Skip connections not sleeping long enough
            if ($result->Time < $minimumSleepTime) {
                Log::info('[KILL_PROCESS] Skipping connection - not sleeping long enough', [
                    'connection_id' => $result->Id,
                    'database' => $result->db,
                    'sleep_time' => $result->Time,
                    'minimum_required' => $minimumSleepTime
                ]);
                continue;
            }

            // Kill truly idle connections
            try {
                DB::connection('mysql')->select(DB::raw("KILL $result->Id"));
                $killedCount++;
                Log::warning('[KILL_PROCESS] Killed long-sleeping connection', [
                    'connection_id' => $result->Id,
                    'database' => $result->db,
                    'sleep_time' => $result->Time
                ]);
            } catch (\\Exception $e) {
                Log::error('[KILL_PROCESS] Failed to kill connection', [
                    'connection_id' => $result->Id,
                    'error' => $e->getMessage()
                ]);
            }
        }
    }

    return $this->sendResponse(
        ['killed_count' => $killedCount],
        "Killed $killedCount connections sleeping > " . ($minimumSleepTime/60) . " minutes"
    );
}

\`\`\`

### Configurable Command

Updated the Artisan command to accept parameters:

\`\`\`php
<?php
// KillSleepProcess.php
class KillSleepProcess extends Command
{
    protected $signature = 'kill:sleep_process {--limit= : Minimum sleep time in minutes before killing connections (default: 5)}';

    public function handle()
    {
        $limit = $this->option('limit');
        $response = $this->killProcess->killSleepProcess(null, $limit);

        $this->info("Kill process completed: " . $response->getData()->message);
        return 0;
    }
}

\`\`\`

### Usage Examples

\`\`\`bash
# Use default 5-minute threshold
php artisan kill:sleep_process
# Output: Kill process completed: Killed 0 connections sleeping > 5 minutes

# Use custom 15-minute threshold
php artisan kill:sleep_process --limit=15
# Output: Kill process completed: Killed 2 connections sleeping > 15 minutes

# Use 30-minute threshold for conservative cleanup
php artisan kill:sleep_process --limit=30

\`\`\`

### Key Changes

1. **Minimum Sleep Time Check**: Only kill connections sleeping > threshold
2. **Configurable Thresholds**: Command accepts \`-limit\` parameter
3. **Comprehensive Logging**: All actions logged with context
4. **Error Handling**: Graceful handling of kill failures
5. **Metrics**: Returns count of killed connections

### Before vs After Behavior

**Before (Aggressive):**

\`\`\`
SHOW PROCESSLIST:
ID | User | Command | Time | Info
1  | root | Sleep   | 5    | NULL  ← KILLED
2  | root | Sleep   | 30   | NULL  ← KILLED
3  | root | Sleep   | 300  | NULL  ← KILLED
4  | root | Sleep   | 900  | NULL  ← KILLED

Result: All sleeping connections killed

\`\`\`

**After (Smart):**

\`\`\`
SHOW PROCESSLIST:
ID | User | Command | Time | Info
1  | root | Sleep   | 5    | NULL  ← SKIPPED (< 5 min)
2  | root | Sleep   | 30   | NULL  ← SKIPPED (< 5 min)
3  | root | Sleep   | 300  | NULL  ← SKIPPED (= 5 min)
4  | root | Sleep   | 900  | NULL  ← KILLED (> 5 min)

Result: Only truly idle connections killed

\`\`\`

## Future Improvements

1. **Connection Pooling**: Implement proper database connection pooling
2. **Circuit Breakers**: Add circuit breaker pattern for inter-service calls
3. **Health Checks**: Regular MySQL connection health validation
4. **Metrics Dashboard**: Grafana dashboard for connection monitoring

---

**TL;DR**: A scheduled cleanup process was killing active database connections from other services, causing "MySQL server has gone away" errors during transactions. Fixed by implementing smart filtering that only kills truly idle connections (5+ minutes) instead of all sleeping connections.

**Status**: ✅ **FIXED** - Zero MySQL connection errors since deployment`
  },
  {
    id: 2,
    title: "Report Performance Quest: From 60 Seconds to Lightning Speed",
    date: "2024-11-25",
    readTime: "12 min read",
    category: "Performance",
    excerpt: "A tale of optimization, caching, and the pursuit of millisecond perfection. How we transformed a reporting system from 60+ second processing times to sub-15 seconds through strategic query optimization and intelligent caching.",
    challenge: "Critical business reports taking 60+ seconds to generate. Users had to wait through 6 separate database queries per chunk, resulting in hundreds of database calls for a single report. The system was crawling through redundant data fetching with zero caching strategy.",
    solution: "Consolidated 6 queries into 1 comprehensive JOIN query per chunk, implemented dynamic column selection based on report configuration, and added intelligent caching with age-based partitioning for historical data.",
    technologies: ["Laravel", "MySQL", "Redis", "Performance Optimization", "Database Architecture"],
    hero: {
      gifSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      liveUrl: "#",
      githubUrl: "#"
    },
    outcomes: [
      "Reduced query count from 24+ queries to 4 queries per report (600% reduction)",
      "Processing time: 60+ seconds → 10-50 seconds first run, 5-15 seconds subsequent runs",
      "Cache hit rate: 85-95% for historical data",
      "Memory usage optimized with selective column loading",
      "90%+ performance improvement that delighted users"
    ],
    story: `# Report Performance Quest: From 60 Seconds to Lightning Speed !

*A tale of optimization, caching, and the pursuit of millisecond perfection*

## The Problem That Kept Us Up at Night

You're running a critical business report for stakeholders. You click "Download," grab a coffee, check your emails, maybe scroll through some memes, and... it's still processing. **60 seconds later**, your report finally arrives. Sound familiar?

This was exactly the challenge we faced with our Laravel-based microservice reporting system. Users were generating reports with hundreds of tickets, and our system was crawling through **6 separate database queries per chunk**, resulting in hundreds of database calls for a single report.

## The Investigation: Where Did All The Time Go?

We rolled up our sleeves and dove into the performance bottlenecks:

### The Original Culprit

\`\`\`php
// The old way - 6 queries per 500-ticket chunk = 6+ queries total
$transitionLogs = $this->getTransitionLogs($tickets);
$slaLogs = $this->getSlaLogs($tickets);
$contentValues = $this->getContentValues($tickets);
$npsValues = $this->getNpsValues($tickets);
$npsDetailValues = $this->getNpsDetailValues($tickets);
$fieldValues = $this->getTransitionFieldValues($tickets);

\`\`\`

For a report with 2,000 tickets processed in chunks of 500, this meant:

- **4 chunks × 6 queries = 24 database queries**
- Each query hitting multiple microservice databases
- Tons of redundant data fetching
- Zero caching strategy

## The Optimization Journey: A Three-Act Performance Play

### Act 1: The Single Query Revolution

**The Insight**: Why make 6 trips to the database when one will do?

We consolidated everything into a single, comprehensive JOIN query:

\`\`\`php
$query = DB::connection('ticket_mysql')->table('tickets as t')
    ->select([
        't.id as ticket_id',
        'tl.id as transition_log_id',
        'tfv.field_value',
        'sla.from_state_id',
        'cf.content',
        'nps.rating'
        // ... dynamic columns based on report config
    ])
    ->leftJoin('transition_logs as tl', 't.id', '=', 'tl.ticket_id')
    ->leftJoin('transition_field_values as tfv', 'tl.id', '=', 'tfv.transition_log_id')
    // ... other optimized joins

\`\`\`

**Result**: Reduced 6 queries to 1 per chunk - a **600% query reduction**!

### Act 2: The Smart Column Selection

**The Problem**: We were selecting columns we didn't need.

**The Solution**: Dynamic column building based on report configuration:

\`\`\`php
// Only include SLA columns if the report actually uses them
$baseColumns = [...];
$slaColumns = isset($customTableColumns['sla']) && !empty($customTableColumns['sla'])
    ? ['sla.id as sla_id', 'sla.from_state_id', 'sla.to_state_id']
    : [];

$allColumns = array_merge($baseColumns, $slaColumns, $contentColumns, $npsColumns);

\`\`\`

**Result**: Faster queries, less memory usage, cleaner code.

### Act 3: The Caching Revolution

**The Breakthrough Moment**: Historical data doesn't change!

We implemented intelligent caching with a twist:

\`\`\`php
// Partition tickets by age
$cutoffDate = Carbon::now()->subDays(1);
foreach ($tickets as $ticket) {
    $ticketDate = Carbon::parse($ticket['updated_at']);
    if ($ticketDate->lte($cutoffDate)) {
        $oldTickets[] = $ticket;  // Cache these!
    } else {
        $recentTickets[] = $ticket;  // Query fresh
    }
}

// Check cache for old tickets
foreach ($oldTickets as $ticket) {
    $cached = Cache::get("lookup_data:v1:{$ticket['id']}:{$configHash}");
    if ($cached) {
        $cachedData[$ticket['id']] = $cached;  // < Cache hit!
    }
}

\`\`\`

**The Magic**:

- **First run**: Query all data, cache historical tickets
- **Second run**: 90%+ cache hit rate, **millisecond response times**

## The Numbers Don't Lie

### Before Optimization:

- **Query Count**: 24+ queries per report
- **Processing Time**: 60+ seconds for large reports
- **Cache Hit Rate**: 0% (no caching)
- **Memory Usage**: High (unnecessary data loading)

### After Optimization:

- **Query Count**: 4 queries per report (one per chunk)
- **Processing Time**: 10-50 seconds first run, **5-15 seconds** subsequent runs
- **Cache Hit Rate**: 85-95% for historical data
- **Memory Usage**: Optimized with selective column loading

### The Real Winner: Cache Performance

\`\`\`json
{
  "total_tickets": 40,
  "cached_tickets": 38,
  "cache_hit_rate": "95%",
  "processing_time_ms": 5.9,
  "avg_time_per_ticket": 0.15
}

\`\`\`

## The Technical Deep Dive: What Made It Work

### 1. **Lookup Table Strategy**

Instead of nested loops searching through arrays, we built efficient lookup tables:

\`\`\`php
// Before: O(n²) complexity
foreach ($tickets as $ticket) {
    foreach ($fieldValues as $field) {
        if ($field['ticket_id'] === $ticket['id']) {
            // Found it after potentially hundreds of iterations
        }
    }
}

// After: O(1) lookup complexity
$fieldLookup[$ticketId][$transitionId][$fieldId] = $value;
$value = $fieldLookup[$ticket['id']][$transition['id']][$field['id']];

\`\`\`

### 2. **Microservice-Aware Database Connections**

Our system spans multiple microservices, each with its own database:

\`\`\`php
// Critical: Use the correct database connection
DB::connection('ticket_mysql')->table('tickets')  // ✓ Right database!
DB::table('tickets')  // ❌ Wrong database!

\`\`\`

### 3. **Configuration-Based Cache Keys**

Cache keys include a hash of the report configuration, ensuring cache invalidation when report structure changes:

\`\`\`php
$configHash = md5(serialize([
    'workflow_ids' => $reportBreakdowns['workflow_ids'],
    'transition_ids' => $reportBreakdowns['workflow_transition_ids'],
    'field_ids' => $reportBreakdowns['workflow_form_field_unique_ids']
]));
$cacheKey = "lookup_data:v1:{$ticketId}:{$configHash}";

\`\`\`

## Industry Best Practices: Did We Do It Right?

### **Query Optimization**: ✅✅✅✅✅

- **Single query strategy**: Standard practice for reducing database round trips
- **JOIN optimization**: Proper use of LEFT JOINs for optional data
- **Selective column loading**: Reduces memory and network overhead

### **Caching Strategy**: ✅✅✅✅✅

- **Cache invalidation by age**: Common pattern for historical data
- **Configurable cache duration**: 24 hours for stable data
- **Cache key versioning**: \`v1:\` prefix allows cache structure evolution

### **Performance Monitoring**: ✅✅✅✅✅

- **Detailed logging**: Cache hit rates, processing times, ticket counts
- **Fallback mechanism**: Graceful degradation to original method on errors

### **Code Organization**: ✅✅✅✅✅

- **Service layer separation**: Clear separation of concerns
- **Repository pattern**: Data access abstraction
- **Dependency injection**: Proper Laravel service container usage

## Future Improvements: The Next Level

### 1. **Redis Cache Integration**

Currently using file-based caching, but Redis would offer:

- **Distributed caching** across multiple servers
- **Better performance** for high-concurrency scenarios
- **Advanced features** like cache tags and atomic operations

\`\`\`php
// Easy switch to Redis
'default' => env('CACHE_DRIVER', 'redis'),

\`\`\`

### 2. **Asynchronous Processing**

For very large reports, queue-based processing:

\`\`\`php
// Dispatch to queue for background processing
GenerateReportJob::dispatch($reportId, $params)
    ->onQueue('reports');

\`\`\`

### 3. **Database Indexing Optimization**

Strategic indexes on frequently queried columns:

\`\`\`sql
-- Composite indexes for common query patterns
CREATE INDEX idx_tickets_workflow_date ON tickets(workflow_id, created_at);
CREATE INDEX idx_field_values_lookup ON transition_field_values(ticket_id, transition_id, fieldId);

\`\`\`

## The Moral of the Story

Performance optimization is a journey, not a destination. We took a systematic approach:

1. **Measure first** - Identify the real bottlenecks
2. **Optimize queries** - Reduce database round trips
3. **Add intelligent caching** - Don't recompute what doesn't change
4. **Monitor and iterate** - Keep measuring and improving

The result? A **90%+ performance improvement** that delighted users and reduced server load. Sometimes the best optimizations are the ones users never notice - because everything just works fast!

### Key Takeaways for Fellow Developers:

- **Profile before optimizing** - Don't guess where the bottlenecks are
- **Cache intelligently** - Not all data needs the same caching strategy
- **Measure everything** - Log performance metrics to track improvements
- **Plan for scale** - Today's optimization is tomorrow's baseline

---

**Remember**: Fast applications make happy users, and happy users make successful products!`
  },
  {
    id: 3,
    title: "Docker-New: Breaking Free from External Dependencies",
    date: "2024-10-05",
    readTime: "10 min read",
    category: "DevOps",
    excerpt: "How a simple PHP upgrade request turned into a complete containerization overhaul. The journey from external Docker image dependency to a self-contained, optimized multi-stage build architecture that gave us complete control.",
    challenge: "A simple PHP upgrade from 7.4.29 to 8.0 was blocked by external Docker image dependency. We couldn't control our own destiny - wanting to upgrade PHP meant waiting for someone else, needing custom extensions wasn't possible, and registry downtime could block deployments.",
    solution: "Architected a complete multi-stage build solution that eliminates external dependencies while improving performance and flexibility. Built a three-stage process: foundation, dependencies, and application layers with smart caching for lightning-fast rebuilds.",
    technologies: ["Docker", "Multi-stage Builds", "Apache", "PHP", "DevOps", "Container Orchestration"],
    hero: {
      gifSrc: "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      liveUrl: "#",
      githubUrl: "#"
    },
    outcomes: [
      "Zero external dependencies - complete infrastructure autonomy",
      "62% faster builds (120s → 45s) through multi-stage caching",
      "26% smaller images (890MB → 654MB) with optimizations",
      "500% more configuration options (5 hardcoded → 25+ flexible)",
      "Complete control over PHP extensions, SSL, and runtime environment"
    ],
    story: `# Docker-New: Breaking Free from External Dependencies

## The Challenge That Started It All

A seemingly simple request came in: "Can we upgrade PHP from 7.4.29 to 8.0?" What should have been a quick version bump turned into a weeks-long journey that fundamentally changed how we approach containerization.

The problem wasn't with our code—it was with a single line in our Dockerfile:

\`\`\`docker
FROM docker.io/nahid35/base-php:7.4.29-3

\`\`\`

This external dependency meant we couldn't control our own destiny. Want to upgrade PHP? Wait for someone else. Need a custom extension? Not possible. Registry down? Deployment blocked.

**We realized we had traded convenience for complete loss of control.**

## Our Solution: The Docker-New Architecture

Instead of just solving the immediate problem, we architected a complete solution that gives us full control while improving performance and flexibility.

### The Multi-Stage Build Strategy

We designed a three-stage build process that eliminates external dependencies while optimizing for speed:

\`\`\`docker
# Stage 1: Foundation - Build exactly what we need
FROM php:7.4.29-apache as base-dependencies

# Stage 2: Dependencies - Cache for lightning-fast rebuilds
FROM base-dependencies as php-dependencies

# Stage 3: Application - Bring it all together
FROM base-dependencies as application

\`\`\`

This architecture solved multiple problems:

- **Zero external dependencies** - we control everything
- **Faster builds** - smart caching means 62% speed improvement
- **Complete flexibility** - change anything, anytime
- **Production ready** - optimized, secure, and reliable

## What We Built

### Project Structure

\`\`\`
docker-new/
├── docker-compose.yml              # Orchestration configuration
├── .env.example                    # Configuration template
├── app/Dockerfile                  # Multi-stage build definition
├── base-php/                       # Base components
│   ├── entrypoint.sh              # Runtime configuration
│   ├── php.ini                    # Performance-tuned settings
│   └── run-scheduler.sh           # Laravel scheduler
├── .commons/                       # Shared resources
│   ├── certs/                     # SSL certificates
│   └── trust-ca/                  # Certificate authorities
└── .envs/                         # Environment configurations
    ├── app.env.example            # Application settings
    ├── apache.env.example         # Web server config
    └── php-ini.env.example        # PHP runtime tuning

\`\`\`

### Key Features We Added

**Dynamic Configuration**
Everything is configurable through environment variables:

- Apache ports and SSL settings
- PHP memory limits and execution time
- Application timezone and build modes
- Proxy settings for corporate environments

**Build Performance**

- Multi-stage caching reduces build times from 120s to 45s
- Image size optimized from 890MB to 654MB
- Dependencies cached separately from application code

**Security & Reliability**

- SSL certificate management built-in
- Non-root execution for security
- Corporate proxy support
- CA trust configuration

### Configuration Examples

**Application Settings** (\`.envs/app.env\`):

\`\`\`
BUILD_MODE=prod                    # Production optimizations
APPLICATION_TIMEZONE=Asia/Dhaka    # Your timezone
UID=1000                          # File permission user

\`\`\`

**Apache Configuration** (\`.envs/apache.env\`):

\`\`\`
APACHE_VHOST_HTTP_PORT=8093       # HTTP port
APACHE_VHOST_HTTPS_PORT=8493      # HTTPS port
APACHE_ENABLE_HTTPS_TRAFFIC=true  # Enable SSL

\`\`\`

**PHP Performance** (\`.envs/php-ini.env\`):

\`\`\`
memory_limit=512M                 # Memory allocation
max_execution_time=300            # Script timeout
upload_max_filesize=100M          # File upload limit

\`\`\`

## The Results: A Complete Transformation

### Performance Improvements

| Metric | Before | After | Improvement |
| --- | --- | --- | --- |
| Build Time | 120 seconds | 45 seconds | **62% faster** |
| Image Size | 890MB | 654MB | **26% smaller** |
| Dependencies | 1 external | 0 external | **100% autonomous** |
| Config Options | 5 hardcoded | 25+ flexible | **500% more control** |

### Operational Benefits

- **Predictable Deployments**: No more external registry surprises
- **Rapid Iteration**: PHP upgrades now take minutes, not weeks
- **Environment Parity**: Identical containers across dev/staging/production
- **Team Confidence**: "It works because we built it"

## Advanced Usage

### Adding PHP Extensions

\`\`\`docker
# Easy extension management
RUN install-php-extensions mongodb imagick xdebug

\`\`\`

### Custom SSL Certificates

\`\`\`bash
# Drop in your certificates
cp your-cert.crt docker-new/.commons/certs/default.crt
cp your-key.key docker-new/.commons/certs/default.key

\`\`\`

### Corporate Proxy Setup

\`\`\`
# Proxy configuration for enterprise environments
APP_HTTP_PROXY=http://proxy.company.com:8080
APP_NO_PROXY=localhost,127.0.0.1,.local

\`\`\`

## Migration from Legacy Docker

### The Migration Story

**Before**: Dependent on external image, slow builds, limited configuration
**After**: Self-contained, fast builds, unlimited flexibility

### Migration Steps

1. **Test in Development**
    
    \`\`\`bash
    docker-compose -f docker-new/docker-compose.yml build
    docker-compose -f docker-new/docker-compose.yml up -d
    
    \`\`\`
    
2. **Validate Functionality**
    
    \`\`\`bash
    docker-compose exec backend php artisan test
    
    \`\`\`
    
3. **Update CI/CD Pipelines**
    - Replace references to \`docker/\` with \`docker-new/\`
    - Update build scripts and deployment configs

## Troubleshooting Common Issues

### Build Problems

\`\`\`bash
# Fix script permissions
chmod +x docker-new/base-php/entrypoint.sh

# Clear build cache
docker-compose build --no-cache

\`\`\`

### SSL Certificate Issues

\`\`\`bash
# Verify certificates exist
ls -la docker-new/.commons/certs/

# Test certificate validity
openssl x509 -in docker-new/.commons/certs/default.crt -text

\`\`\`

### Composer Dependencies

\`\`\`bash
# Clear composer cache
docker-compose exec backend composer clear-cache

# Fresh dependency install
docker-compose exec backend composer install --optimize-autoloader

\`\`\`

## The Engineering Philosophy Behind This Solution

This project represents more than a technical migration—it's a shift in thinking:

- **Ownership over Convenience**: Short-term ease often creates long-term constraints
- **Control over Dependencies**: What you can't control can control you
- **Performance through Design**: Good architecture is inherently fast
- **Flexibility as a Feature**: Systems should adapt to requirements, not limit them

## What This Means for Your Team

### For Developers

- No more "works on my machine" mysteries
- Consistent environments across all stages
- Easy customization for specific needs

### For DevOps

- Predictable, reliable deployments
- Complete infrastructure control
- No external dependency risks

### For the Business

- Faster feature delivery
- Reduced deployment risks
- Infrastructure that scales with needs

## Next Steps and Extensibility

This solution is designed to grow with your needs:

- **Easy PHP Upgrades**: Change one line in the Dockerfile
- **Custom Extensions**: Add any PHP extension you need
- **Environment Scaling**: Same codebase, multiple environments
- **Team Replication**: Template for other microservices

## The Bottom Line

We transformed a fragile, externally-dependent system into a robust, self-contained solution that gives us complete control while improving performance and reliability.

The \`docker-new\` directory isn't just an upgraded Docker setup—it's a foundation for infrastructure independence and engineering excellence.

**Your infrastructure should work for you, not against you.**`
  },
  {
    id: 4,
    title: "From Chaos to Clarity: How We Tamed Our Microservice Logs with PLG Stack",
    date: "2024-09-20",
    readTime: "18 min read",
    category: "DevOps",
    excerpt: "A journey of implementing centralized logging in a Laravel-based microservice architecture. How we went from frantically SSH-ing into multiple containers at 2 AM to having a unified view of our entire ecosystem through the PLG (Prometheus, Loki, Grafana) stack.",
    challenge: "11 independent microservices generating logs in their own format, stored in their own silos. When something went wrong, debugging felt like being a detective with half the evidence missing. No unified view, time-consuming troubleshooting across multiple containers, and reactive monitoring.",
    solution: "Implemented the PLG stack (Prometheus, Loki, Grafana) with enhanced Laravel logging, structured JSON logs, correlation IDs for request tracing, and Docker integration with automated log collection and beautiful visualizations.",
    technologies: ["PLG Stack", "Loki", "Grafana", "Promtail", "Laravel", "Docker", "Microservices", "Monitoring"],
    hero: {
      gifSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80",
      liveUrl: "#",
      githubUrl: "#"
    },
    outcomes: [
      "Reduced debugging time from 30+ minutes to 30 seconds",
      "Single query to search across all 11 microservices",
      "Proactive monitoring with real-time alerts instead of reactive debugging",
      "Correlation IDs enable complete request flow tracking",
      "Developer productivity transformed from dreading debugging to enjoying problem-solving"
    ],
    story: `# From Chaos to Clarity: How We Tamed Our Microservice Logs with PLG Stack

*A journey of implementing centralized logging in a Laravel-based microservice architecture*

---

## The Challenge: When Logs Are Everywhere and Nowhere

Picture this: It's 2 AM, your ticket service is acting up, and you're frantically SSH-ing into multiple containers, running \`tail -f\` commands, and trying to piece together what went wrong. Sound familiar?

In our DWE (Digital Workflow Engine) microservice architecture, we had **11 independent services** running in Docker containers. Each service was generating its own logs, in its own format, stored in its own little silo. When something went wrong (and it always did at the worst possible time), debugging felt like being a detective with half the evidence missing.

**The pain points were real:**

- **Log hunting across multiple containers** - "Was it the gateway? The user service? Or maybe the ticket service?"
- **No unified view** - Each service told only part of the story
- **Time-consuming troubleshooting** - Hours spent connecting dots across different log files
- **Reactive monitoring** - We only knew about problems when users started complaining

## The Solution: Enter the PLG Stack

After researching various logging solutions, we decided to implement the **PLG stack** - a powerful combination of:

- **Prometheus** - Metrics collection (though we focused on the "LG" part for now)
- **Loki** - Log aggregation and storage
- **Grafana** - Visualization and alerting

Why PLG? Unlike traditional logging solutions that require complex setup and licensing costs, the PLG stack is:

- **Open source** and free
- **Designed for cloud-native** environments
- **Horizontally scalable**
- **Plays well with Docker**

## What We Built: A Centralized Logging Paradise

### Architecture Overview

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Ticket Service │    │   User Service  │    │  Gateway Service│
│                 │    │                 │    │                 │
│  Laravel Logs   │    │  Laravel Logs   │    │  Laravel Logs   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Promtail (Log Collector)                    │
├─────────────────────────────────────────────────────────────────┤
│                      Loki (Log Storage)                        │
├─────────────────────────────────────────────────────────────────┤
│                    Grafana (Visualization)                     │
└─────────────────────────────────────────────────────────────────┘

\`\`\`

### The Implementation Journey

### Step 1: Enhanced Laravel Logging

First, we supercharged our Laravel logging configuration. We created a new \`centralized\` logging channel that outputs structured JSON logs:

\`\`\`php
'centralized' => [
    'driver' => 'monolog',
    'formatter' => Monolog\\Formatter\\JsonFormatter::class,
    'processors' => [
        function ($record) {
            $record['extra']['service'] = 'ticket-service';
            $record['extra']['version'] = config('app.version', '1.0.0');
            $record['extra']['environment'] = config('app.env');

            // Add correlation ID for request tracing
            if (request()->hasHeader('X-Correlation-ID')) {
                $record['extra']['correlation_id'] = request()->header('X-Correlation-ID');
            }

            return $record;
        },
    ],
],

\`\`\`

**Why structured JSON?** Because when Loki ingests these logs, it can automatically parse and index all the metadata, making searches lightning-fast.

### Step 2: Docker Integration Magic

We enhanced our \`docker-compose.yml\` to include proper labeling for log collection:

\`\`\`yaml
services:
  php:
    build: ./docker/php/
    labels:
      - "service=ticket-service"
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

\`\`\`

These labels help Promtail identify and route logs from different services.

### Step 3: The PLG Stack Deployment

The magic happens in our \`docker-commons\` setup:

- **Loki** runs on port 3100, acting as our log database
- **Grafana** runs on port 3001, providing beautiful dashboards
- **Promtail** silently collects logs from all our containers

## The Results: From Hours to Seconds

### What We Achieved

**Before PLG:**

- **30+ minutes** to trace an issue across services
- **Manual log correlation** - copying timestamps and request IDs
- **Reactive debugging** - only after user complaints

**After PLG:**

- **30 seconds** to identify the root cause
- **Single query** to search across all services
- **Proactive monitoring** with real-time alerts

### Real-World Impact

1. **Correlation IDs in Action**: When a user reports a ticket creation issue, we can now:
    
    \`\`\`
    {service="ticket-service"} |= "correlation_id: abc-123"
    
    \`\`\`
    
    And see the entire request flow across gateway → user service → ticket service.
    
2. **Error Pattern Detection**: Instead of discovering errors one by one, we can now query:
    
    \`\`\`
    {service=~".*-service"} |= "ERROR" | json | line_format "{{.message}}"
    
    \`\`\`
    
    And spot patterns in failures across our entire ecosystem.
    
3. **Performance Monitoring**: We can track slow queries and API response times:
    
    \`\`\`
    {service="ticket-service"} |~ "response_time.*[5-9][0-9]{2,}ms"
    
    \`\`\`
    

## The Human Story: Developer Experience Transformed

### Before: The Midnight Detective Work

\`\`\`bash
# The old way - jumping between containers
docker exec -it gateway_php tail -f storage/logs/laravel.log
# ... wait, the error might be in user service
docker exec -it user_php tail -f storage/logs/laravel.log
# ... actually, let me check ticket service too
docker exec -it ticket_php tail -f storage/logs/laravel.log

\`\`\`

### After: The Zen of Centralized Logs

\`\`\`
# Open Grafana dashboard
# Type: {service=~".*-service"} |= "user_id: 12345"
# See entire user journey in one view

\`\`\`

The transformation in developer productivity has been remarkable. Our team went from dreading debugging sessions to actually enjoying the process of solving problems.

## Technical Highlights: What Makes This Special

### Smart Log Processing

- **Automatic metadata injection** - Service name, version, environment
- **Correlation ID tracking** - Follow requests across service boundaries
- **User context enrichment** - Know who triggered what action

### Scalable Architecture

- **Loki's label-based indexing** - Fast queries without full-text search overhead
- **JSON structured logs** - Rich metadata without parsing complexity
- **Docker-native collection** - No agent installation required

### Beautiful Visualizations

- **Service health dashboards** - At-a-glance system status
- **Error rate monitoring** - Spot issues before they escalate
- **Request flow tracing** - Visualize microservice interactions

## Lessons Learned: The Real Talk

### What Worked Brilliantly

- **Start simple**: We began with just the ticket service and gradually expanded
- **JSON everything**: Structured logs made querying effortless
- **Correlation IDs**: Game-changer for tracing requests across services
- **Docker labels**: Elegant way to route logs without code changes

### What We'd Do Differently

- **Alert fatigue is real**: Start with fewer, more meaningful alerts
- **Storage planning**: Logs can grow faster than you think - plan retention policies early
- **Team training**: Invest time in teaching the team LogQL (Loki's query language)

### Pro Tips for Your Implementation

1. **Label strategically** - Too many labels can hurt Loki's performance
2. **Use correlation IDs** - They're your debugging superpower
3. **Start with one service** - Prove the concept before going full-scale
4. **Plan for volume** - Production logs can be surprisingly large

## Conclusion: The Journey Continues

Implementing the PLG stack transformed how we understand and debug our microservice architecture. What started as a technical solution became a cultural shift - from reactive fire-fighting to proactive system understanding.

The best part? We did this with open-source tools, no vendor lock-in, and a solution that scales with our growth.

**If you're drowning in microservice logs**, consider the PLG stack. Your 2 AM self will thank you!

---

## Quick Start Guide

Here's the minimal setup:

1. **Add structured logging to Laravel**:
    
    \`\`\`php
    // In config/logging.php
    'centralized' => [
        'driver' => 'monolog',
        'formatter' => Monolog\\Formatter\\JsonFormatter::class,
        // ... processors for metadata
    ],
    
    \`\`\`
    
2. **Label your Docker containers**:
    
    \`\`\`yaml
    services:
      your-service:
        labels:
          - "service=your-service-name"
    
    \`\`\`
    
3. **Deploy PLG stack with docker-compose**:
    
    \`\`\`yaml
    # Basic PLG setup
    loki:
      image: grafana/loki:latest
      ports: ["3100:3100"]
    
    grafana:
      image: grafana/grafana:latest
      ports: ["3001:3000"]
    
    promtail:
      image: grafana/promtail:latest
      # ... configuration for log collection
    
    \`\`\`
    

**Happy logging!**

---

*Written by a developer who's been there, debugged that, and lived to tell the tale. May your logs be structured and your queries be fast!*`
  }
];