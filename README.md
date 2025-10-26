<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Personal Finance Tracker

A full-stack personal finance management application with React frontend and Node.js backend.

## 📋 Architecture

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Visualization**: Recharts for charts and analytics

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB running locally or MongoDB Atlas account

### Automated Setup (Windows)

Simply run the startup script:
```bash
start-app.bat
```

This will:
- ✅ Start MongoDB
- ✅ Initialize the database with default categories
- ✅ Start backend server (port 5000)
- ✅ Start frontend server (port 3000)
- ✅ Open the app in your browser

### Manual Setup

#### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

#### 2. Configure Environment

Backend `.env` file (already configured):
```env
MONGODB_URI=mongodb://localhost:27017/finance-tracker
PORT=5000
NODE_ENV=development
```

Frontend `.env.local` file (already configured):
```env
VITE_API_URL=http://localhost:5000/api
```

#### 3. Initialize Database

```bash
cd backend
npm run init-db
```

This creates 12 default categories (7 expense + 5 income).

#### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 🛠️ Available Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with auto-reload
npm run init-db    # Initialize database with default categories
npm run test-api   # Run API endpoint tests
```

### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 📁 Project Structure

```
web/
├── backend/
│   ├── controllers/        # Business logic
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Error handling
│   ├── server.js          # Express server
│   ├── initDatabase.js    # DB initialization script
│   ├── testAPI.js         # API testing script
│   └── package.json       # Backend dependencies
│
├── components/            # React components
├── services/             # API client
├── hooks/                # Custom React hooks
├── App.tsx               # Main React component
├── start-app.bat         # Quick start script (Windows)
└── README.md             # This file
```

Backend API runs on: `http://localhost:5000/`

## 📁 Project Structure

```
web/
├── frontend/          # React + Vite application
├── backend/           # Express API server
│   ├── models/        # MongoDB schemas
│   ├── controllers/   # Business logic
│   ├── routes/        # API endpoints
│   └── middleware/    # Custom middleware
├── components/        # React components
├── hooks/            # Custom hooks
└── types.ts          # TypeScript definitions
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend (cd backend)
- `npm run dev` - Start with auto-reload
- `npm start` - Start production server

## � Environment Variables

Create or update `.env.local` in the project root (already created):

```
VITE_API_URL=http://localhost:5000/api
```

This points the frontend to your backend API. Change it if your backend runs on a different host/port.

## 📚 API Quick Reference

Base URL: `http://localhost:5000/api`

Transactions:
- `GET /transactions` — list all (supports filters: category, type, startDate, endDate)
- `POST /transactions` — create
- `GET /transactions/:id` — get one
- `PUT /transactions/:id` — update
- `DELETE /transactions/:id` — delete
- `GET /transactions/statistics` — summary by type and category

Budgets:
- `GET /budgets` — list all (optional: month)
- `POST /budgets` — create
- `PUT /budgets/:id` — update
- `DELETE /budgets/:id` — delete
- `GET /budgets/status?month=YYYY-MM` — spending vs budget

Categories:
- `GET /categories` — list all
- `POST /categories` — create
- `PUT /categories/:id` — update
- `DELETE /categories/:id` — delete
- `POST /categories/init/defaults` — initialize 8 defaults

## ✨ Features

- ✅ Transaction management
- ✅ Budget tracking
- ✅ Category management
- ✅ Financial analytics
- ✅ Monthly reports
- ✅ Spending insights
- ✅ Dark mode support

## 🗄️ Database

MongoDB collections:
- **Transactions** - Income and expense records
- **Budgets** - Budget allocations by category
- **Categories** - Transaction categories

## 🔗 Integration

Frontend communicates with backend via REST API:
- Base URL: `http://localhost:5000/api`
- CORS enabled for local development
