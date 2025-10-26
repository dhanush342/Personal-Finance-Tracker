
import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { Icon } from './Icon';

interface AllTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionItem: React.FC<{ transaction: Transaction, onDelete: (id: string) => void }> = ({ transaction, onDelete }) => {
  const { id, type, amount, category, date } = transaction;
  const isIncome = type === 'income';
  const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <li className="flex items-center justify-between py-3 px-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        <div className="flex items-center space-x-4 min-w-0">
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
            <button onClick={() => onDelete(id)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-full">
                <Icon name="delete" className="h-4 w-4" />
            </button>
        </div>
    </li>
  );
};

const AllTransactionsModal: React.FC<AllTransactionsModalProps> = ({ isOpen, onClose, transactions, onDeleteTransaction }) => {
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStartDate, setFilterStartDate] = useState<string>('');
  const [filterEndDate, setFilterEndDate] = useState<string>('');

  const categories = useMemo(() => ['all', ...Array.from(new Set(transactions.map(t => t.category)))], [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (filterType !== 'all' && t.type !== filterType) return false;
      if (filterCategory !== 'all' && t.category !== filterCategory) return false;
      const transactionDate = new Date(t.date);
      if (filterStartDate && transactionDate < new Date(filterStartDate)) return false;
      if (filterEndDate && transactionDate > new Date(filterEndDate)) return false;
      return true;
    });
  }, [transactions, filterType, filterCategory, filterStartDate, filterEndDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">All Transactions</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
            <Icon name="close" className="h-6 w-6" />
          </button>
        </header>
        
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-gray-200 dark:border-gray-700">
            {/* Filter controls */}
            <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
            </select>
            <input type="date" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" placeholder="Start Date" />
            <input type="date" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700" placeholder="End Date" />
        </div>

        <main className="flex-1 overflow-y-auto p-4">
          {filteredTransactions.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map(t => (
                <TransactionItem key={t.id} transaction={t} onDelete={onDeleteTransaction} />
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No transactions match your filters.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllTransactionsModal;
