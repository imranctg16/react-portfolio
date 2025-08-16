# SQL Playground Test Suite

Comprehensive testing framework for the SQL Playground application, covering all core functionalities and ensuring system reliability.

## 🎯 Overview

The test suite consists of three main components:

1. **API Tests** (`api_tests.sh`) - Backend functionality testing
2. **Frontend Tests** (`frontend_tests.sh`) - Frontend accessibility and integration testing  
3. **Comprehensive Runner** (`run_all_tests.sh`) - Orchestrates all tests with detailed reporting

## 🚀 Quick Start

### Prerequisites

Ensure all services are running:

```bash
# 1. Start database
docker-compose up mysql -d

# 2. Start backend API  
cd backend
php artisan serve --host=0.0.0.0 --port=8001 &

# 3. Start frontend
cd frontend
PORT=3001 npm start &
```

### Run All Tests

```bash
# Run comprehensive test suite
./tests/run_all_tests.sh
```

### Run Individual Test Suites

```bash
# API tests only
./tests/api_tests.sh

# Frontend tests only  
./tests/frontend_tests.sh
```

## 📋 Test Coverage

### API Tests (12 tests)

#### Service Health
- ✅ **Service Availability** - Backend and frontend accessibility
- ✅ **Health Check Endpoint** - `/api/health` response validation

#### Core Endpoints
- ✅ **Questions List** - `/api/questions` endpoint functionality
- ✅ **Single Question** - `/api/questions/{id}` endpoint validation
- ✅ **Questions by Difficulty** - `/api/questions/difficulty/{level}` filtering
- ✅ **Database Schema** - `/api/schema` endpoint structure
- ✅ **Streak Data** - `/api/streak` endpoint functionality

#### Data Validation
- ✅ **Question Data Structure** - Required fields validation (id, title, description, difficulty, category, points)
- ✅ **Schema Structure** - Database table and column validation

#### Functional Testing
- ✅ **SQL Query Evaluation** - Correct query processing and response structure
- ✅ **SQL Error Handling** - Malformed query error response validation with error_details
- ✅ **Unauthenticated Access** - Public endpoint accessibility

### Frontend Tests (7 tests)

#### Accessibility
- ✅ **Frontend Accessibility** - React app loading at http://localhost:3001
- ✅ **HTML Structure Validation** - Essential HTML elements and bundle loading
- ✅ **Static Assets Loading** - JavaScript bundle accessibility

#### Integration
- ✅ **Frontend to API Connectivity** - Cross-origin API communication
- ✅ **CORS Configuration** - Proper cross-origin resource sharing setup
- ✅ **Essential API Endpoints** - Frontend dependency validation

#### Features
- ✅ **ReactFlow Dependencies** - Database diagram functionality verification

### Database Integrity (4 checks)

- ✅ **Questions Table** - 15 practice questions loaded
- ✅ **Categories Table** - 9 product categories available  
- ✅ **Products Table** - 10 sample products for queries
- ✅ **Orders Table** - 10 sample orders for complex queries

### Quick Functionality (3 tests)

- ✅ **Basic Query Evaluation** - Simple SELECT query processing
- ✅ **Error Handling** - Invalid SQL syntax error response
- ✅ **Schema Endpoint** - Database structure retrieval

## 🔧 Test Features

### Comprehensive Error Reporting
- Color-coded output (✅ Pass, ❌ Fail, ⚡ Info)
- Detailed error messages with troubleshooting hints
- Test execution statistics (Total/Passed/Failed)

### Robust Validation
- JSON response structure validation
- HTTP status code verification  
- Data field presence and type checking
- Cross-service communication testing

### Service Integration Testing
- Database connectivity validation
- API endpoint accessibility verification
- Frontend-backend integration testing
- ReactFlow diagram dependency validation

## 📊 Expected Results

**All Tests Passing Output:**
```
🎉 ALL TESTS PASSED! 🎉

✅ Your SQL Playground is working perfectly!
✅ All core functionalities are operational  
✅ Frontend and backend integration is working
✅ Database connections are stable
✅ Error handling is functioning correctly

🚀 Ready for production use!
```

## 🛠 Troubleshooting

### Common Issues and Solutions

#### Backend API Not Running (Port 8001)
```bash
cd backend
php artisan serve --host=0.0.0.0 --port=8001
```

#### Frontend Not Accessible (Port 3001)  
```bash
cd frontend
npm install
PORT=3001 npm start
```

#### Database Connection Issues
```bash
docker-compose up mysql -d
docker-compose logs mysql
```

#### CORS Issues
- Verify Laravel CORS configuration in `config/cors.php`
- Check frontend API base URL configuration

#### Test Script Permissions
```bash
chmod +x tests/*.sh
```

### Manual Verification

If automated tests fail, verify manually:

1. **API Health**: `curl http://localhost:8001/api/health`
2. **Frontend Access**: Open http://localhost:3001 in browser
3. **Query Execution**: Submit test query through UI
4. **Database Schema**: Check schema viewer in frontend

## 📝 Adding New Tests

### API Test Template
```bash
test_new_feature() {
    print_test "New feature description"
    
    response=$(curl -s "$API_BASE/new-endpoint")
    
    if echo "$response" | grep -q "expected_content"; then
        pass_test "New feature description"
    else
        fail_test "New feature description" "Expected content not found"
    fi
}
```

### Frontend Test Template
```bash
test_new_ui_feature() {
    print_test "New UI feature"
    
    if curl -s "$FRONTEND_URL" | grep -q "feature_indicator"; then
        pass_test "New UI feature"
    else
        fail_test "New UI feature" "Feature not detected"
    fi
}
```

## 🎯 Continuous Integration

The test suite is designed for CI/CD integration:

```bash
# Exit code 0 = all tests passed
# Exit code 1 = some tests failed
./tests/run_all_tests.sh && echo "Deploy ready" || echo "Fix issues first"
```

### Test Execution Time
- **API Tests**: ~10-15 seconds
- **Frontend Tests**: ~5-10 seconds  
- **Total Runtime**: ~20-30 seconds

## 📈 Test Metrics

Track these metrics for application health:
- Test pass rate (target: 100%)
- API response times (target: <500ms)
- Frontend load times (target: <3s)
- Database query performance (target: <100ms)

---

**Note**: Always run tests before deploying changes to ensure system stability and functionality.