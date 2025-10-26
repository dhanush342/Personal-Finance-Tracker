# Database Scripts & Models

This folder contains database initialization scripts and model schemas.

## 📁 Contents

- **`initDatabase.js`** - Initialize database with default categories
- **`testAPI.js`** - Test all API endpoints
- **`models/`** - Mongoose schema definitions (reference copy)

## 🚀 Usage

### Initialize Database

From the project root:
```bash
cd database
node initDatabase.js
```

This will:
- Connect to MongoDB
- Clear existing categories
- Create 12 default categories
- Display confirmation

### Test API Endpoints

Make sure the backend server is running first!

```bash
cd database
node testAPI.js
```

This will test:
- Health endpoint
- Categories CRUD
- Transactions CRUD
- Budgets CRUD
- Statistics endpoints

## 🗄️ Database Schema

### Collections

1. **transactions** - User financial transactions
2. **budgets** - Budget limits by category
3. **categories** - Income/expense categories

See `models/` folder for detailed schema definitions.

## ⚙️ Configuration

Database connection string is configured in `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/finance-tracker
```

## 📝 Default Categories

### Expense (8)
- 🍔 Food & Dining
- 🚗 Transportation
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Bills & Utilities
- 🏥 Healthcare
- 📚 Education
- 📝 Other Expense

### Income (4)
- 💰 Salary
- 💼 Freelance
- 📈 Investment
- 💵 Other Income
