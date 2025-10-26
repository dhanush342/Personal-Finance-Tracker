# Frontend - Personal Finance Tracker

React + TypeScript + Vite frontend application.

## 📁 Structure

```
frontend/
├── components/         # React components
│   ├── AllTransactionsModal.tsx
│   ├── Budgets.tsx
│   ├── CategoryPieChart.tsx
│   ├── DarkModeToggle.tsx
│   ├── FinancialGoals.tsx
│   ├── Header.tsx
│   ├── MonthlyBarChart.tsx
│   ├── SavingsAccounts.tsx
│   ├── Summary.tsx
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts
├── services/           # API client
│   └── api.ts
├── App.tsx             # Main application component
├── index.tsx           # Entry point
├── types.ts            # TypeScript type definitions
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── env.d.ts            # Environment variable types
└── .env.local          # Environment variables

```

## 🚀 Getting Started

### Install Dependencies

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env.local` (already configured):
```env
VITE_API_URL=http://localhost:5000/api
GEMINI_API_KEY=your_api_key_here
```

### Development Server

```bash
npm run dev
```

Frontend runs on: **http://localhost:3000**

### Build for Production

```bash
npm run build
```

Output: `dist/` folder

### Preview Production Build

```bash
npm run preview
```

## 🔌 API Integration

The frontend connects to the backend API through the service layer:

**`services/api.ts`**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const transactionAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/transactions`),
  create: (data) => axios.post(`${API_BASE_URL}/transactions`, data),
  // ...
};
```

## 🎨 Features

- ✅ Transaction management (income/expense)
- ✅ Budget tracking with visual indicators
- ✅ Category-based organization
- ✅ Interactive charts (pie chart, bar chart)
- ✅ Dark mode support
- ✅ Financial goals tracking
- ✅ Savings accounts management
- ✅ Monthly summaries
- ✅ Responsive design

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client

## 📝 Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔗 Backend Connection

Make sure the backend is running on **http://localhost:5000** before starting the frontend.

See `../backend/README.md` for backend setup instructions.
