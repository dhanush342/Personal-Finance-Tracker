
import React, { useEffect, useState } from 'react';
import { Transaction } from '../types';
import { categoryAPI } from '../services/api';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void> | void;
}
// Fallback defaults in case API fails
const DEFAULT_EXPENSE_CATEGORIES = ['Food & Dining','Transportation','Shopping','Entertainment','Bills & Utilities','Healthcare','Education','Other Expense'];
const DEFAULT_INCOME_CATEGORIES = ['Salary','Freelance','Investment','Other Income'];

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categorySets, setCategorySets] = useState<{ income: string[]; expense: string[] }>({
    income: DEFAULT_INCOME_CATEGORIES,
    expense: DEFAULT_EXPENSE_CATEGORIES,
  });

  // Load categories from backend (once)
  useEffect(() => {
    let mounted = true;
    categoryAPI
      .getAll()
      .then((data: any[]) => {
        if (!mounted) return;
        const income = data.filter((c: any) => c.type === 'income').map((c: any) => c.name);
        const expense = data.filter((c: any) => c.type === 'expense').map((c: any) => c.name);
        if (income.length || expense.length) {
          setCategorySets({ income: income.length ? income : DEFAULT_INCOME_CATEGORIES, expense: expense.length ? expense : DEFAULT_EXPENSE_CATEGORIES });
        }
      })
      .catch(() => {
        // ignore and keep defaults
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!amount || !category || !date) {
      setError('Please fill all fields');
      return;
    }
    const value = parseFloat(amount);
    if (!isFinite(value) || value <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    try {
      setLoading(true);
      await onAddTransaction({
        type,
        amount: value,
        category,
        date,
      });
      setAmount('');
      setCategory('');
    } catch (err: any) {
      setError(err?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  const categories = type === 'expense' ? categorySets.expense : categorySets.income;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Add New Transaction</h2>
      {error && (
        <div className="mb-2 p-2 rounded border border-red-300 bg-red-100 text-red-700">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md transition-colors ${
                type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md transition-colors ${
                type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="amount" className="sr-only">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            min="0.01"
            step="0.01"
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="sr-only">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          >
            <option value="" disabled>Select Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="sr-only">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>
        
        <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
