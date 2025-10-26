
import React from 'react';
import { Transaction } from '../types';
import { Icon } from './Icon';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onViewAll: () => void;
}

const TransactionItem: React.FC<{ transaction: Transaction, onDelete: (id: string) => void }> = ({ transaction, onDelete }) => {
  const { id, type, amount, category, date } = transaction;
  const isIncome = type === 'income';
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <li className="flex items-center justify-between py-3">
        <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                <Icon name={isIncome ? 'income' : 'expense'} className={`h-5 w-5 ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{category}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(date).toLocaleDateString()}</p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <p className={`font-semibold flex-shrink-0 ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                {isIncome ? '+' : '-'}{formattedAmount}
            </p>
            <button onClick={() => onDelete(id)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1">
                <Icon name="delete" className="h-4 w-4" />
            </button>
        </div>
    </li>
  );
};


const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction, onViewAll }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Recent Transactions</h2>
        <button onClick={onViewAll} className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">
            View All
        </button>
      </div>
      {transactions.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map(t => (
            <TransactionItem key={t.id} transaction={t} onDelete={onDeleteTransaction} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">No transactions yet.</p>
      )}
    </div>
  );
};

export default TransactionList;
