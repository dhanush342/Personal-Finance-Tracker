
# Finance Tracker API Documentation

Base URL: `http://localhost:5000/api`

## 📊 Transactions API

### Get All Transactions
```http
GET /transactions
```

**Query Parameters:**
- `type` - Filter by 'income' or 'expense'
- `category` - Filter by category name
- `startDate` - Filter by start date (ISO format)
- `endDate` - Filter by end date (ISO format)

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "type": "expense",
    "amount": 45.50,
    "category": "Food & Dining",
    "description": "Lunch",
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Create Transaction
```http
POST /transactions
```

**Request Body:**
```json
{
  "type": "expense",
  "amount": 45.50,
  "category": "Food & Dining",
  "description": "Lunch at restaurant",
  "date": "2024-01-15"
}
```

**Response:** Created transaction object

### Get Single Transaction
```http
GET /transactions/:id
```

### Update Transaction
```http
PUT /transactions/:id
```

**Request Body:** Same as create (all fields optional)

### Delete Transaction
```http
DELETE /transactions/:id
```

### Get Transaction Statistics
```http
GET /transactions/stats
```

**Query Parameters:**
- `startDate` - Start date for statistics
- `endDate` - End date for statistics

**Response:**
```json
{
  "totalIncome": 5000,
  "totalExpense": 3200,
  "balance": 1800,
  "transactionCount": 45,
  "categoryBreakdown": [
    {
      "_id": "Food & Dining",
      "total": 850,
      "count": 12
    }
  ]
}
```

### Get Monthly Summary
```http
GET /transactions/monthly
```

**Query Parameters:**
- `year` - Year (default: current year)

**Response:**
```json
[
  {
    "month": 1,
    "income": 5000,
    "expense": 3200,
    "balance": 1800,
    "count": 45
  }
]
```

## 💰 Budgets API

### Get All Budgets
```http
GET /budgets
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "category": "Food & Dining",
    "amount": 500,
    "period": "monthly",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-01-31T23:59:59.999Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create Budget
```http
POST /budgets
```

**Request Body:**
```json
{
  "category": "Food & Dining",
  "amount": 500,
  "period": "monthly",
  "startDate": "2024-01-01"
}
```

### Get Single Budget
```http
GET /budgets/:id
```

### Update Budget
```http
PUT /budgets/:id
```

### Delete Budget
```http
DELETE /budgets/:id
```

### Get Budget Status
```http
GET /budgets/status
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "category": "Food & Dining",
    "budgetAmount": 500,
    "spent": 320,
    "remaining": 180,
    "percentage": 64,
    "status": "ok"
  }
]
```

Status values: `ok`, `warning` (>80%), `exceeded` (>100%)

## 📁 Categories API

### Get All Categories
```http
GET /categories
```

**Query Parameters:**
- `type` - Filter by 'income' or 'expense'

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Food & Dining",
    "type": "expense",
    "color": "#FF6B6B",
    "icon": "🍔",
    "isDefault": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Default Categories
```http
GET /categories/defaults
```

Returns list of system default categories.

### Create Category
```http
POST /categories
```

**Request Body:**
```json
{
  "name": "Custom Category",
  "type": "expense",
  "color": "#FF5733",
  "icon": "🎯",
  "description": "My custom category"
}
```

### Initialize Default Categories
```http
POST /categories/init/defaults
```

Creates all 12 default categories. Safe to run multiple times.

### Get Single Category
```http
GET /categories/:id
```

### Update Category
```http
PUT /categories/:id
```

### Delete Category
```http
DELETE /categories/:id
```

## 🏥 Health Check

### Server Health
```http
GET /health
```

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🎨 Default Categories

### Expense Categories (7)
1. 🍔 Food & Dining (#FF6B6B)
2. 🚗 Transportation (#4ECDC4)
3. 🛍️ Shopping (#45B7D1)
4. 🎬 Entertainment (#FFA07A)
5. 💡 Bills & Utilities (#98D8C8)
6. 🏥 Healthcare (#F7DC6F)
7. 📚 Education (#BB8FCE)
8. 📝 Other Expense (#999999)

### Income Categories (4)
1. 💰 Salary (#52C41A)
2. 💼 Freelance (#1890FF)
3. 📈 Investment (#722ED1)
4. 💵 Other Income (#13C2C2)

## ⚠️ Error Responses

All endpoints return consistent error format:

```json
{
  "error": "Error message description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing with curl

```bash
# Health check
curl http://localhost:5000/api/health

# Get all categories
curl http://localhost:5000/api/categories

# Create transaction
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "expense",
    "amount": 50,
    "category": "Food & Dining",
    "description": "Lunch",
    "date": "2024-01-15"
  }'

# Get statistics
curl http://localhost:5000/api/transactions/stats

# Filter transactions by type
curl "http://localhost:5000/api/transactions?type=expense"

# Get budget status
curl http://localhost:5000/api/budgets/status
```

## 📦 Postman Collection

Import `Finance_Tracker_API.postman_collection.json` for ready-made API tests.

---

**Built with Express.js + MongoDB + Mongoose**
