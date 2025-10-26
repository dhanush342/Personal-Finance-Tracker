# Project Structure

```
web/
│
├── 📁 frontend/                    # Frontend Application (React + TypeScript)
│   ├── 📁 components/              # React UI Components
│   │   ├── AllTransactionsModal.tsx
│   │   ├── Budgets.tsx
│   │   ├── CategoryPieChart.tsx
│   │   ├── DarkModeToggle.tsx
│   │   ├── FinancialGoals.tsx
│   │   ├── Header.tsx
│   │   ├── Icon.tsx
│   │   ├── MonthlyBarChart.tsx
│   │   ├── SavingsAccounts.tsx
│   │   ├── Summary.tsx
│   │   ├── TransactionForm.tsx
│   │   └── TransactionList.tsx
│   │
│   ├── 📁 hooks/                   # Custom React Hooks
│   │   └── useLocalStorage.ts
│   │
│   ├── 📁 services/                # API Client Services
│   │   └── api.ts
│   │
│   ├── App.tsx                     # Main Application Component
│   ├── index.tsx                   # Application Entry Point
│   ├── types.ts                    # TypeScript Type Definitions
│   ├── index.html                  # HTML Template
│   ├── vite.config.ts              # Vite Configuration
│   ├── tsconfig.json               # TypeScript Configuration
│   ├── env.d.ts                    # Environment Variable Types
│   ├── .env.local                  # Environment Variables
│   ├── package.json                # Frontend Dependencies
│   └── README.md                   # Frontend Documentation
│
├── 📁 backend/                     # Backend API Server (Node.js + Express)
│   ├── 📁 controllers/             # Business Logic Controllers
│   │   ├── budgetController.js
│   │   ├── categoryController.js
│   │   └── transactionController.js
│   │
│   ├── 📁 models/                  # Mongoose Data Models
│   │   ├── Budget.js
│   │   ├── Category.js
│   │   └── Transaction.js
│   │
│   ├── 📁 routes/                  # API Route Definitions
│   │   ├── budgetRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── transactionRoutes.js
│   │
│   ├── 📁 middleware/              # Express Middleware
│   │   └── errorHandler.js
│   │
│   ├── server.js                   # Express Server Entry Point
│   ├── .env                        # Environment Variables
│   ├── .env.example                # Environment Template
│   ├── package.json                # Backend Dependencies
│   ├── API_DOCUMENTATION.md        # Complete API Reference
│   ├── Finance_Tracker_API.postman_collection.json
│   └── README.md                   # Backend Documentation
│
├── 📁 database/                    # Database Scripts & Schemas
│   ├── 📁 models/                  # Schema Reference (Copy)
│   │   ├── Budget.js
│   │   ├── Category.js
│   │   └── Transaction.js
│   │
│   ├── initDatabase.js             # Database Initialization Script
│   ├── testAPI.js                  # API Testing Script
│   └── README.md                   # Database Documentation
│
├── start-app.bat                   # Windows Quick Start Script
├── NEW_README.md                   # Updated Main Documentation
└── README.md                       # Original Documentation

```

## 📋 Layer Responsibilities

### Frontend Layer (Port 3000)
- **Technology**: React 19 + TypeScript + Vite
- **Purpose**: User Interface
- **Key Features**:
  - Transaction management UI
  - Budget tracking dashboard
  - Interactive charts (Recharts)
  - Dark mode support
  - Responsive design

### Backend Layer (Port 5000)
- **Technology**: Node.js + Express + Mongoose
- **Purpose**: REST API Server
- **Key Features**:
  - 18+ RESTful API endpoints
  - Data validation (Joi)
  - Error handling middleware
  - CORS support
  - MongoDB integration

### Database Layer
- **Technology**: MongoDB + Mongoose
- **Purpose**: Data Persistence & Management
- **Key Features**:
  - Database initialization
  - Schema definitions
  - API testing utilities
  - Default data seeding

## 🔄 Data Flow

```
User (Browser)
    ↓
Frontend (React) - Port 3000
    ↓ API Calls (axios)
Backend (Express) - Port 5000
    ↓ Mongoose
Database (MongoDB) - Port 27017
    ↓
Collections: transactions, budgets, categories
```

## 🚀 Quick Commands

```bash
# Initialize database
cd database && node initDatabase.js

# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev

# Test API (backend must be running)
cd database && node testAPI.js

# Quick start everything (Windows)
start-app.bat
```

## 📦 Dependencies

### Frontend
- react, react-dom
- typescript
- vite
- recharts
- lucide-react
- axios

### Backend
- express
- mongoose
- joi
- cors
- dotenv
- axios (for testing)
- nodemon (dev)

### Database
- MongoDB (external)
- Mongoose schemas

---

**Last Updated**: October 26, 2025
