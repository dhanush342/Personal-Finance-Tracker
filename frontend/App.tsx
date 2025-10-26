
import React, { useState, useMemo, useEffect } from 'react';
import { Transaction, Goal, Budget, SavingsAccount } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryPieChart from './components/CategoryPieChart';
import MonthlyBarChart from './components/MonthlyBarChart';
import Budgets from './components/Budgets';
import FinancialGoals from './components/FinancialGoals';
import AllTransactionsModal from './components/AllTransactionsModal';
import SavingsAccounts from './components/SavingsAccounts';

const initialTransactions: Transaction[] = [
  // Keeping a few for initial state
  { id: '1', type: 'income', amount: 5000, category: 'Salary', date: new Date(new Date().setDate(1)).toISOString().split('T')[0] },
  { id: '2', type: 'expense', amount: 80, category: 'Groceries', date: new Date(new Date().setDate(3)).toISOString().split('T')[0] },
  { id: '3', type: 'expense', amount: 50, category: 'Transport', date: new Date(new Date().setDate(5)).toISOString().split('T')[0] },
  { id: '4', type: 'expense', amount: 120, category: 'Entertainment', date: new Date(new Date().setDate(15)).toISOString().split('T')[0] },
];

const initialGoals: Goal[] = [
  { id: 'g1', name: 'New Laptop', targetAmount: 2000, currentAmount: 750 },
  { id: 'g2', name: 'Vacation Fund', targetAmount: 3000, currentAmount: 300 },
];

const initialBudgets: Budget[] = [
  { category: 'Groceries', amount: 400 },
  { category: 'Dining Out', amount: 150 },
  { category: 'Entertainment', amount: 200 },
  { category: 'Shopping', amount: 250 },
];

const initialSavingsAccounts: SavingsAccount[] = [
    { id: 's1', name: 'Emergency Fund', balance: 1500 },
    { id: 's2', name: 'Vacation Fund', balance: 500 },
];


const App: React.FC = () => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', initialTransactions);
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', initialGoals);
  const [budgets, setBudgets] = useLocalStorage<Budget[]>('budgets', initialBudgets);
  const [savingsAccounts, setSavingsAccounts] = useLocalStorage<SavingsAccount[]>('savingsAccounts', initialSavingsAccounts);
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('darkMode', false);
  const [activeTab, setActiveTab] = useState<'overview' | 'budgets' | 'goals' | 'savings'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions(prev => [...prev, newTransaction]);

    // Check against budget
    if (newTransaction.type === 'expense') {
      const budget = budgets.find(b => b.category === newTransaction.category);
      if (budget) {
        const spent = transactions
          .filter(t => t.type === 'expense' && t.category === newTransaction.category && new Date(t.date).getMonth() === new Date().getMonth())
          .reduce((sum, t) => sum + t.amount, 0) + newTransaction.amount;
        
        if (spent > budget.amount) {
          setTimeout(() => alert(`Warning: You've exceeded your budget for ${budget.category}!`), 100);
        }
      }
    }
  };
  
  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'currentAmount'>) => {
    setGoals(prev => [...prev, { ...goal, id: crypto.randomUUID(), currentAmount: 0 }]);
  };

  const addFundsToGoal = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g));
    addTransaction({
      type: 'expense',
      amount,
      category: 'Goal Contribution',
      date: new Date().toISOString().split('T')[0],
    });
    const goal = goals.find(g => g.id === goalId);
    if(goal && goal.currentAmount + amount >= goal.targetAmount) {
       setTimeout(() => alert(`Congratulations! You've reached your goal: ${goal.name}!`), 100);
    }
  };
  
  const addSavingsAccount = (name: string) => {
    setSavingsAccounts(prev => [...prev, { id: crypto.randomUUID(), name, balance: 0 }]);
  }

  const addFundsToSavings = (accountId: string, amount: number) => {
    setSavingsAccounts(prev => prev.map(acc => acc.id === accountId ? { ...acc, balance: acc.balance + amount } : acc));
    addTransaction({
        type: 'expense',
        amount,
        category: 'Savings Transfer',
        date: new Date().toISOString().split('T')[0],
    });
  };

  const summaryData = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    return { income, expense, balance };
  }, [transactions]);
  
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions]);
  
  const TabButton: React.FC<{tab: 'overview' | 'budgets' | 'goals' | 'savings'; label: string}> = ({ tab, label }) => (
      <button 
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
      >
        {label}
      </button>
  );

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <Summary {...summaryData} />
        
        <div className="my-6 lg:my-8">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-md inline-flex items-center space-x-2">
                <TabButton tab="overview" label="Overview" />
                <TabButton tab="budgets" label="Budgets" />
                <TabButton tab="goals" label="Goals" />
                <TabButton tab="savings" label="Savings" />
            </div>
        </div>
        
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Monthly Overview</h2>
                <MonthlyBarChart transactions={transactions} />
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Expense Categories</h2>
                <CategoryPieChart transactions={transactions} />
              </div>
            </div>
            <div className="lg:col-span-1 space-y-6 lg:space-y-8">
              <TransactionForm onAddTransaction={addTransaction} />
              <TransactionList transactions={sortedTransactions.slice(0, 5)} onDeleteTransaction={deleteTransaction} onViewAll={() => setIsModalOpen(true)} />
            </div>
          </div>
        )}

        {activeTab === 'budgets' && <Budgets budgets={budgets} transactions={transactions} setBudgets={setBudgets} />}
        {activeTab === 'goals' && <FinancialGoals goals={goals} onAddGoal={addGoal} onAddFunds={addFundsToGoal} />}
        {activeTab === 'savings' && <SavingsAccounts accounts={savingsAccounts} onAddAccount={addSavingsAccount} onAddFunds={addFundsToSavings} />}

      </main>
      <AllTransactionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactions={sortedTransactions}
        onDeleteTransaction={deleteTransaction}
      />
    </div>
  );
};

export default App;
