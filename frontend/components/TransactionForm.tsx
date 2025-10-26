
import React, { useState } from 'react';
import { Transaction } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const expenseCategories = ['Groceries', 'Transport', 'Bills', 'Entertainment', 'Dining Out', 'Shopping', 'Health', 'Goal Contribution', 'Savings Transfer', 'Other'];
const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) {
      alert('Please fill all fields');
      return;
    }
    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      date,
    });
    setAmount('');
    setCategory('');
  };

  const categories = type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Add New Transaction</h2>
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>
        
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
