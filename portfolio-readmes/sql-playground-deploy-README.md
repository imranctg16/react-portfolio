# SQL Playground

A comprehensive interactive learning platform for practicing SQL and Laravel Query Builder skills with real-time evaluation and feedback.

## 🎯 Overview

SQL Playground is a full-stack web application designed to help developers improve their SQL skills through hands-on practice. It features an e-commerce database schema with progressive difficulty questions, real-time query evaluation, and instant feedback.

## ✨ Key Features

- **🎓 Progressive Learning**: 15 questions from Easy (5pts) → Medium (15pts) → Hard (30pts)
- **⚡ Real-time Evaluation**: Instant feedback with side-by-side result comparison
- **📊 Progress Tracking**: Point system with completion stats and attempt tracking
- **✅ Visual Progress**: Completed questions marked with checkmarks and progress indicators
- **💾 Persistent Storage**: Progress saved in browser localStorage across sessions
- **🗄️ Realistic Database**: E-commerce schema with categories, products, orders
- **🔍 Interactive Interface**: Question browser, SQL editor, schema viewer with progress dashboard
- **🎨 Collapsible UI**: Instructions and hints sections can be collapsed for cleaner interface
- **💡 Smart Hints**: Optional hints with point penalties, collapsible for better UX
- **🚀 Full-Stack**: React frontend + Laravel API + MySQL database
- **🐳 Dockerized**: Easy setup and deployment

## 🚀 Quick Start

### Method 1: Current Working Setup
```bash
# 1. Start Database
docker-compose up mysql -d

# 2. Start Laravel API
cd backend
composer install --no-dev
php artisan serve --host=0.0.0.0 --port=8001 &

# 3. Start React Frontend  
cd frontend
npm install
PORT=3001 npm start &
```

### Method 2: Full Docker (Future)
```bash
git clone <your-repo>
cd sql-playground
docker-compose up -d
```

### 🌐 Access Points
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8001
- **Database**: localhost:3307
- **phpMyAdmin**: http://localhost:8081

### 🔑 Database Credentials
- **Database**: `sql_playground`
- **Username**: `playground_user`
- **Password**: `playground_pass`

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Port**: 3001
- **Technology**: React 18, TypeScript, Inline CSS
- **Features**: 
  - Interactive question browser with difficulty filtering
  - SQL query editor with monospace font
  - Real-time result comparison (user vs expected)
  - **Progress Dashboard**: Point tracking, completion stats, visual indicators
  - **Question Status**: Checkmarks, attempt counters, completion highlighting
  - **Persistent Progress**: localStorage saves progress across browser sessions
  - **Collapsible Interface**: Instructions and hints can be collapsed/expanded for cleaner UX

### Backend (Laravel 8 API)
- **Port**: 8001  
- **Technology**: Laravel 8, PHP 7.4+
- **Features**:
  - RESTful API for questions and query evaluation
  - Secure query execution (SELECT-only)
  - Result comparison algorithm
  - Database schema introspection

### Database (MySQL 8.0)
- **Port**: 3307
- **Technology**: MySQL 8.0 in Docker
- **Schema**: E-commerce themed with realistic relationships

## 🗄️ Database Schema

### Tables Structure
```sql
categories (id, name, description, parent_id, timestamps)
├── products (id, name, price, stock_quantity, category_id, brand, is_active, timestamps)
    ├── order_items (order_id, product_id, quantity, unit_price, total_price)
        └── orders (id, customer_name, customer_email, order_date, status, total_amount, timestamps)
```

### Sample Data
- **9 Categories**: Electronics, Computers, Smartphones, Clothing, etc.
- **10 Products**: MacBook Pro, iPhone, Samsung Galaxy, clothing items, books
- **10 Orders**: Realistic customer orders with various statuses
- **14 Order Items**: Line items connecting orders to products

## 📚 Question Bank (15 Total)

### Easy (5 points each)
1. **List All Products** - Basic SELECT with specific columns
2. **Find Expensive Products** - Simple WHERE clause
3. **Sort Products by Price** - ORDER BY clause
4. **Count Total Products** - Basic aggregation
5. **Find Products by Brand** - WHERE with string matching

### Medium (10-15 points each)
6. **Products with Categories** - INNER JOIN
7. **Products per Category** - GROUP BY with COUNT
8. **Average Price by Category** - GROUP BY with AVG
9. **Orders with Customer Info** - Basic relationship queries
10. **Products Above Average Price** - Subquery with AVG

### Hard (20-30 points each)
11. **Complete Order Details** - Multi-table JOINs
12. **Top Selling Products** - Complex aggregation with LIMIT
13. **Category Revenue Analysis** - Complex JOINs with filtering
14. **Customer Order Statistics** - Advanced aggregations
15. **Products Never Ordered** - LEFT JOIN with NULL filtering

## 🎮 How to Use the Playground

### Step-by-Step Workflow

1. **📊 Check Your Progress**
   - Visit http://localhost:3001
   - View your **Progress Dashboard** at the top showing:
     - **Total Points Earned**
     - **Questions Completed** (X/15)
     - **Progress Percentage**
     - **Breakdown by Difficulty** (Easy/Medium/Hard)

2. **📋 Browse Questions**
   - Use the left sidebar to see all available questions
   - **✅ Completed questions** show checkmarks and green highlighting
   - **Attempt counters** show how many times you've tried each question
   - Filter by difficulty using the dropdown

3. **🎯 Select a Challenge**
   - Click any question to load it
   - Read the description and requirements
   - **Collapsible UI**: Instructions and hints are now collapsible for cleaner interface
   - **💡 Hint System**: Optional hints available (with point penalty) that can be collapsed/expanded
   - Note the point value and completion status

4. **✍️ Write Your SQL**
   - Use the SQL Query Editor in the main area
   - Write your solution (e.g., `SELECT name, price FROM products;`)
   - Leverage the database schema reference

5. **▶️ Execute & Earn Points**
   - Click "Run Query" to test your solution
   - View side-by-side result comparison
   - **Earn points** on first correct completion
   - See **real-time progress updates** in dashboard
   - Progress automatically saved to browser storage

### Example Learning Path

1. **Start with Easy**: Master basic SELECT, WHERE, ORDER BY
2. **Progress to Medium**: Learn JOINs, GROUP BY, basic subqueries  
3. **Challenge with Hard**: Complex multi-table operations, aggregations

## 📝 Sample Queries

### Easy Example
**"Find Expensive Products"**
```sql
SELECT * FROM products WHERE price > 100;
```

### Medium Example  
**"Products with Categories"**
```sql
SELECT p.name as product_name, c.name as category_name 
FROM products p 
JOIN categories c ON p.category_id = c.id;
```

### Hard Example
**"Top Selling Products"**
```sql
SELECT p.name, SUM(oi.quantity) as total_sold 
FROM products p 
JOIN order_items oi ON p.id = oi.product_id 
GROUP BY p.id, p.name 
ORDER BY total_sold DESC 
LIMIT 3;
```

## 🛠️ API Reference

### Core Endpoints

#### Questions Management
```bash
GET /api/questions                    # Get all questions
GET /api/questions/difficulty/{level} # Filter by difficulty (easy|medium|hard)
GET /api/questions/{id}              # Get specific question
GET /api/categories                  # Get question categories
```

#### Query Evaluation
```bash
POST /api/evaluate
{
  "question_id": 1,
  "user_sql": "SELECT name, price FROM products;",
  "query_type": "sql"
}
```

#### Database Introspection
```bash
GET /api/schema                      # Get full database schema
GET /api/sample-data?table=products  # Get sample data from tables
GET /api/health                      # Health check
```

### Response Format
```json
{
  "success": true,
  "data": {
    "is_correct": true,
    "points_earned": 10,
    "message": "Correct! Well done!",
    "expected_result": [...],
    "user_result": [...]
  }
}
```

## 🧪 Testing the Setup

### Manual API Testing
```bash
# Test API health
curl http://localhost:8001/api/health

# Test question loading
curl http://localhost:8001/api/questions

# Test query evaluation
curl -X POST http://localhost:8001/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{"question_id": 1, "user_sql": "SELECT name, price FROM products;", "query_type": "sql"}'
```

### Frontend Testing
1. Visit http://localhost:3001
2. Select "List All Products" (easy question)
3. Enter: `SELECT name, price FROM products;`
4. Click "Run Query" and verify success response

## 🚧 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Check if MySQL container is running
docker-compose ps mysql

# Restart MySQL if needed  
docker-compose restart mysql

# Check logs
docker-compose logs mysql
```

**API Not Responding**
```bash
# Check if Laravel is running
curl http://localhost:8001/api/health

# Restart Laravel if needed
cd backend && php artisan serve --host=0.0.0.0 --port=8001 &
```

**Frontend Compilation Error**
```bash
# Check current working directory
pwd  # Should be in /sql-playground/frontend

# Clear cache and restart
rm -rf node_modules/.cache
PORT=3001 npm start
```

**Port Already in Use**
```bash
# Find and kill processes using the ports
lsof -ti:8001 | xargs kill -9  # Laravel
lsof -ti:3001 | xargs kill -9  # React  
lsof -ti:3307 | xargs kill -9  # MySQL
```

**Database Schema Missing**
```bash
# Connect to MySQL and check tables
mysql -h 127.0.0.1 -P 3307 -u playground_user -pplayground_pass sql_playground
SHOW TABLES;  # Should show: categories, products, orders, order_items, questions

# If tables missing, recreate database
docker-compose down mysql
docker volume rm sql-playground_mysql_data
docker-compose up mysql -d
```

## 🎯 Current Status & Known Issues

### ✅ Working Features
- ✅ MySQL database with full e-commerce schema and sample data
- ✅ Laravel API with 15 practice questions and evaluation system  
- ✅ React frontend with interactive question browser and SQL editor
- ✅ Real-time query execution and result comparison
- ✅ **Complete Point System**: Earn points, track progress, visual indicators
- ✅ **Progress Dashboard**: Total points, completion stats, difficulty breakdown
- ✅ **Question Status Tracking**: Checkmarks, attempt counters, completion highlighting
- ✅ **Persistent Storage**: Progress saved in browser localStorage
- ✅ **Real-time Updates**: Points and progress update instantly on correct answers
- ✅ **Collapsible UI**: Instructions and hints sections can be collapsed for cleaner interface
- ✅ **Smart Hint System**: Optional hints with point penalties, expandable on demand

### ⚠️ Known Limitations
- Laravel Query Builder evaluation not fully implemented (SQL only for now)
- Frontend uses inline CSS instead of Tailwind (works but not optimal)
- Docker containers run manually instead of full docker-compose automation
- No user authentication or progress persistence

### 🔄 Current Working Setup
```bash
# These services are currently running successfully:
MySQL Container:     docker-compose (port 3307) 
Laravel API:         Local PHP server (port 8001)
React Frontend:      Local npm server (port 3001)
```

## 🚀 Future Enhancements

### 🎯 Next Priority Features (In Development)
- [ ] **Solution Viewer**: Show question solutions without awarding points
- [ ] **Daily Streak Tracking**: Track consecutive days of question attempts
- [ ] **Calendar Progress View**: Monthly calendar showing attempt days
- [ ] **Activity Persistence**: Enhanced localStorage for daily activity tracking

### 📅 Calendar & Streak Features (Planned)
- [ ] **Streak Counter**: Visual streak number display on progress page
- [ ] **Month View**: Quick overview of attempt days with visual indicators
- [ ] **Motivational Elements**: Streak achievements and progress badges
- [ ] **Daily Activity Log**: Backend API for tracking daily question attempts

### 🔧 Technical Improvements (Planned)
- [ ] Laravel Query Builder evaluation
- [ ] User authentication and progress tracking  
- [ ] Leaderboards and achievements
- [ ] More complex database schemas
- [ ] Query performance analysis
- [ ] Full Docker containerization
- [ ] Mobile-responsive design improvements

## 🤝 Development & Contributing

### Adding New Questions
1. Insert into `questions` table:
```sql
INSERT INTO questions (title, description, difficulty, category, expected_sql, expected_laravel, points) 
VALUES ('Your Question', 'Description...', 'medium', 'joins', 'SELECT...', 'Model::...', 15);
```

2. Test with evaluation endpoint
3. Ensure proper point allocation

### Extending the Schema
1. Update `database/init/01-schema.sql`
2. Add new sample data
3. Update API endpoints if needed

### Frontend Development
- Main App component: `frontend/src/index.tsx`
- Inline styles used (consider migrating to CSS modules)
- TypeScript interfaces for type safety

## 📞 Support & Documentation

### Project Structure
```
sql-playground/
├── backend/           # Laravel 8 API
├── frontend/          # React TypeScript app  
├── database/init/     # MySQL schema and data
├── docker-compose.yml # Container orchestration
└── README.md         # This file
```

### Key Files
- `database/init/01-schema.sql` - Database schema and sample data
- `database/init/02-questions.sql` - Practice questions bank  
- `backend/app/Http/Controllers/QuestionController.php` - API logic
- `frontend/src/index.tsx` - Complete React application

**Happy SQL Learning! 🎯📊**

---
*Last updated: 2025-07-17 - Added collapsible UI for instructions and hints, improved user experience*