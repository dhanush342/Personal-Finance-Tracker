# 💰 Personal Finance Tracker

A full-stack personal finance management application with separated frontend, backend, and database layers.

## 📁 Project Structure

```
web/
├── frontend/           # React + TypeScript + Vite
│   ├── components/    # UI components
│   ├── hooks/         # Custom hooks
│   ├── services/      # API client
│   ├── App.tsx        # Main app
│   ├── package.json   # Frontend dependencies
│   └── README.md      # Frontend documentation
│
├── backend/           # Node.js + Express API
│   ├── controllers/   # Business logic
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Error handling
│   ├── server.js      # Express server
│   ├── package.json   # Backend dependencies
│   └── README.md      # Backend documentation
│
├── database/          # Database scripts & models
│   ├── models/        # Schema reference
│   ├── initDatabase.js # Initialize DB
│   ├── testAPI.js     # API tests
│   └── README.md      # Database documentation
│
├── start-app.bat      # Quick start script (Windows)
└── README.md          # This file
```

## 🚀 Quick Start

### Option 1: Automated Setup (Windows)

```bash
start-app.bat
```

This script will:
1. Start MongoDB
2. Initialize database with default categories
3. Start backend server (port 5000)
4. Start frontend server (port 3000)
5. Open app in browser

### Option 2: Manual Setup

#### 1. Prerequisites
- Node.js (v16+)
- MongoDB running locally

#### 2. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

#### 3. Configure Environment

**Backend** (`backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/finance-tracker
PORT=5000
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`):
```env
VITE_API_URL=http://localhost:5000/api
```

#### 4. Initialize Database

```bash
cd database
node initDatabase.js
```

#### 5. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

## 📦 Component Breakdown

### Frontend Layer
- **Purpose**: User interface
- **Port**: 3000
- **Technology**: React 19 + TypeScript + Vite
- **Key Features**:
  - Transaction management
  - Budget tracking
  - Interactive charts
  - Dark mode
  - Responsive design

### Backend Layer
- **Purpose**: REST API server
- **Port**: 5000
- **Technology**: Node.js + Express + Mongoose
- **Key Features**:
  - 18+ API endpoints
  - Data validation (Joi)
  - Error handling
  - CORS enabled
  - MongoDB integration

### Database Layer
- **Purpose**: Data persistence & initialization
- **Database**: MongoDB (finance-tracker)
- **Collections**:
  - transactions
  - budgets
  - categories
- **Key Features**:
  - Auto-initialization scripts
  - Default categories
  - API testing tools

## 🛠️ Available Commands

### Frontend
```bash
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview build
```

### Backend
```bash
cd backend
npm run dev        # Start with auto-reload
npm start          # Start production server
```

### Database
```bash
cd database
node initDatabase.js   # Initialize database
node testAPI.js        # Test API endpoints
```

## 🎯 Features

- ✅ Income & expense tracking
- ✅ Category-based organization
- ✅ Budget management with alerts
- ✅ Financial statistics
- ✅ Monthly summaries
- ✅ Interactive charts (pie, bar)
- ✅ Dark mode support
- ✅ Savings goals tracking
- ✅ Responsive design
- ✅ RESTful API
- ✅ Data persistence with MongoDB

## 📊 Default Categories

**Expense (8)**
- 🍔 Food & Dining
- 🚗 Transportation
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Bills & Utilities
- 🏥 Healthcare
- 📚 Education
- 📝 Other Expense

**Income (4)**
- 💰 Salary
- 💼 Freelance
- 📈 Investment
- 💵 Other Income

## 📚 Documentation

- **Frontend**: See `frontend/README.md`
- **Backend**: See `backend/README.md`
- **Database**: See `database/README.md`
- **API**: See `backend/API_DOCUMENTATION.md`

## 🧪 Testing

### Test Database Connection
```bash
cd database
node initDatabase.js
```

### Test API Endpoints
```bash
cd database
node testAPI.js
```

Make sure backend server is running before testing API!

## 🔧 Tech Stack

### Frontend
- React 19
- TypeScript 5.8
- Vite 6.x
- Recharts 3.3
- Lucide React
- Axios

### Backend
- Node.js
- Express 4.18
- Mongoose 8.0
- Joi 17.11
- CORS 2.8
- Dotenv 16.3

### Database
- MongoDB (local or Atlas)

## 🌐 Ports

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

## 🔗 API Endpoints

### Transactions
- `GET /api/transactions` - Get all
- `POST /api/transactions` - Create
- `GET /api/transactions/stats` - Statistics
- `GET /api/transactions/monthly` - Monthly summary

### Budgets
- `GET /api/budgets` - Get all
- `POST /api/budgets` - Create
- `GET /api/budgets/status` - Budget status

### Categories
- `GET /api/categories` - Get all
- `POST /api/categories` - Create
- `POST /api/categories/init/defaults` - Initialize defaults

See `backend/API_DOCUMENTATION.md` for complete API reference.

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Windows
net start MongoDB

# Verify MongoDB is running
Get-Process -Name mongod
```

### Port Already in Use
- Frontend (3000): Check other Vite/React apps
- Backend (5000): Check other Node.js processes

### Database Not Initialized
```bash
cd database
node initDatabase.js
```

## 📄 License

MIT License - Free to use for personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

**Built with ❤️ using React, Node.js, and MongoDB**

**🎉 Happy tracking your finances! 💰**
