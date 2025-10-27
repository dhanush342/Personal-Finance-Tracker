

# Personal Finance Tracker

A full-stack personal finance management application with React frontend and Node.js backend.

## 📋 Architecture

- **Frontend**: React 19 + TypeScript + Vite

# 💰 Personal Finance Tracker

A modern, full-stack Personal Finance Management Web App that helps you take control of your money.


With this app, you can add, view, and analyze your daily transactions, manage budgets, and gain insights into your spending patterns using charts powered by Recharts.

---

## 🚀 Features

- Add & Manage Transactions — Track income and expenses easily.
- Visual Analytics — Dynamic charts to visualize your spending trends.
- Categories & Budgets — Organize transactions by category and set monthly limits.
- Date Filters — View reports for custom date ranges.
- MongoDB Integration — Persistent data storage with Mongoose ORM.
- Modern Stack — React 19 + TypeScript + Vite + Node.js + Express.
- Environment Secure — Configurable `.env` file for sensitive keys.
- Scalable Design — Ready for authentication and cloud deployment.

---

## 🧱 Tech Stack

| Layer    | Technology                         |
|--------- |------------------------------------|
| Frontend | React 19, TypeScript, Vite, Recharts |
| Backend  | Node.js, Express.js                |
| Database | MongoDB + Mongoose                 |
| Styling  | TailwindCSS                        |
| API Test | Postman / Thunder Client           |
| Deploy   | Vercel / Render / MongoDB Atlas    |

---

## 🧰 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/dhanush342/Personal-Finance-Tracker.git
cd Personal-Finance-Tracker
```

### 2️⃣ Install dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd ../frontend
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in `/backend` and add:

```env
MONGODB_URI=mongodb://localhost:27017/finance-tracker
PORT=5000
JWT_SECRET=change_this_to_a_long_random_string
NODE_ENV=development
```

Create `.env.local` in `/frontend` and add:

```env
VITE_API_URL=/api
```

Vite dev proxy forwards `/api` to the backend at `http://localhost:5000` (see `frontend/vite.config.ts`).

### 4️⃣ Initialize Database (optional)

```bash
cd backend
npm run init-db
```

This seeds default income and expense categories.

### 5️⃣ Run the project

Start backend and frontend in separate terminals:

Backend

```bash
cd backend
npm run dev
```

Frontend

```bash
cd frontend
npm run dev
```

Then open the shown URL (usually http://localhost:3000 or http://localhost:3002).

---

## 🪄 Quick Start (Windows)

You can use the helper script to launch everything automatically:

```bat
start-app.bat
```

This will:
- Start MongoDB (if running as service)
- Initialize default categories
- Start backend on port 5000
- Start frontend on port 3000 (or pick 3001/3002 if busy)
- Open the app in your browser

---

## � Screenshots

Add screenshots of the dashboard, charts, and transaction forms here.

---

## 🌐 Future Enhancements

- JWT-based Authentication (login/logout, roles)
- Mobile-friendly responsive UI improvements
- Cloud deployment (Render / Vercel + MongoDB Atlas)
- AI-based expense insights
- Export transactions (CSV, Excel, PDF)

---

## 📚 API Quick Reference

Base URL: `http://localhost:5000/api`

Transactions

- `GET /transactions` — list (supports category, type, startDate, endDate)
- `POST /transactions` — create
- `GET /transactions/:id` — get one
- `PUT /transactions/:id` — update
- `DELETE /transactions/:id` — delete
- `GET /transactions/statistics` — summary by type and category

Budgets

- `GET /budgets` — list all (optional: month)
- `POST /budgets` — create
- `PUT /budgets/:id` — update
- `DELETE /budgets/:id` — delete
- `GET /budgets/status?month=YYYY-MM` — spending vs budget

Categories

- `GET /categories` — list all
- `POST /categories` — create
- `PUT /categories/:id` — update
- `DELETE /categories/:id` — delete
- `POST /categories/init/defaults` — seed defaults

---

## 🛠️ Scripts

Backend (from `backend/`)

```bash
npm run dev        # start dev server (nodemon)
npm start          # start production server
npm run init-db    # seed default categories
npm run test-api   # quick end-to-end API test
```

Frontend (from `frontend/`)

```bash
npm run dev        # start Vite dev server
npm run build      # build for production
npm run preview    # preview production build
```

---

## 🧩 Project Structure

```
web/
├─ backend/
│  ├─ controllers/       # Business logic
│  ├─ models/            # Mongoose schemas
│  ├─ routes/            # API endpoints
│  ├─ middleware/        # Auth, error handling
│  ├─ server.js          # Express app
│  ├─ initDatabase.js    # Seed script
│  ├─ testAPI.js         # API smoke test
│  └─ package.json
│
├─ frontend/
│  ├─ components/        # UI components (Dashboard, Summary, etc.)
│  ├─ context/           # Auth context
│  ├─ services/          # API client wrappers
│  ├─ hooks/             # Custom hooks
│  ├─ App.tsx            # App routing
│  └─ package.json
│
├─ start-app.bat         # Windows quick start
├─ quick-start.bat       # Windows install helper
└─ README.md
```

---

## 🧯 Troubleshooting

Port 5000 already in use (backend)

```powershell
netstat -ano | findstr :5000
taskkill /PID <PID_FROM_PREVIOUS_COMMAND> /F
# then restart: cd backend; npm run dev
```

MongoDB not running

- If installed as a Windows service, run PowerShell as Administrator:
```powershell
Get-Service *mongo*
Start-Service MongoDB
```

Health check

```powershell
curl http://localhost:5000/api/health
```

“Failed to fetch” in the browser

- Make sure the backend is running and the health check works.
- Ensure you are logged in; protected routes need a token.
- The frontend uses Vite proxy (`/api` -> `http://localhost:5000`).
