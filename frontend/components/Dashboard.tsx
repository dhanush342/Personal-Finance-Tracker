import React, { useEffect, useState } from 'react';
import Summary from './Summary';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import CategoryPieChart from './CategoryPieChart';
import MonthlyBarChart from './MonthlyBarChart';
import Budgets from './Budgets';
import AllTransactionsModal from './AllTransactionsModal';
import { transactionAPI, categoryAPI, budgetAPI } from '../services/api';

interface Transaction {
  _id: string;
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface Budget {
  category: string;
  amount: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showAllModal, setShowAllModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load transactions and categories
  useEffect(() => {
    loadData();
  }, [refreshKey]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [txData, catData, budgetData] = await Promise.all([
        transactionAPI.getAll(),
        categoryAPI.getAll(),
        budgetAPI.getAll().catch(() => []) // Budget may not exist
      ]);
      
      // Map _id to id for compatibility with TransactionList component
      const mappedTransactions = txData.map((tx: any) => ({
        ...tx,
        id: tx._id
      }));
      
      setTransactions(mappedTransactions);
      setCategories(catData);
      setBudgets(budgetData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (newTransaction: Omit<Transaction, 'id' | '_id'>) => {
    try {
      await transactionAPI.create({
        ...newTransaction,
        description: newTransaction.category
      });
      // Refresh data
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      console.error('Failed to add transaction:', err);
      alert(err.message || 'Failed to add transaction');
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    
    try {
      await transactionAPI.delete(id);
      // Refresh data
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      console.error('Failed to delete transaction:', err);
      alert(err.message || 'Failed to delete transaction');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Get recent transactions (last 5)
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="mb-8">
          <Summary key={refreshKey} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <TransactionList 
              transactions={recentTransactions}
              onDeleteTransaction={handleDeleteTransaction}
              onViewAll={() => setShowAllModal(true)}
            />
          </div>
        </div>

        {/* Charts and Budgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Pie Chart */}
          <div>
            <CategoryPieChart transactions={transactions} />
          </div>

          {/* Monthly Bar Chart */}
          <div>
            <MonthlyBarChart transactions={transactions} />
          </div>
        </div>

        {/* Budgets Section */}
        <div className="mb-8">
          <Budgets 
            budgets={budgets}
            transactions={transactions}
            setBudgets={setBudgets}
          />
        </div>

        {/* All Transactions Modal */}
        {showAllModal && (
          <AllTransactionsModal
            isOpen={showAllModal}
            transactions={transactions}
            onClose={() => setShowAllModal(false)}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
