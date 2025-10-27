
import React, { useEffect, useState } from 'react';
import { Icon } from './Icon';
import api, { transactionAPI } from '../services/api';

interface SummaryProps {
  income?: number;
  expense?: number;
  balance?: number;
}

const SummaryCard: React.FC<{ title: string; amount: number; icon: 'income' | 'expense' | 'balance'; color: string }> = ({ title, amount, icon, color }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon name={icon} className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formattedAmount}</p>
      </div>
    </div>
  );
};


const Summary: React.FC<SummaryProps> = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const stats: any = await transactionAPI.getStatistics();
        // stats.byType is an array grouped by type
        const byType = stats.byType || [];
        const incomeStat = byType.find((s: any) => s._id === 'income');
        const expenseStat = byType.find((s: any) => s._id === 'expense');
        const inc = incomeStat ? incomeStat.total : 0;
        const exp = expenseStat ? expenseStat.total : 0;
        if (mounted) {
          setIncome(inc);
          setExpense(exp);
          setBalance(inc - exp);
        }
      } catch (err) {
        // silently fail — leave zeros
        console.error('Failed to load summary stats', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      <SummaryCard title="Total Income" amount={income} icon="income" color="bg-green-500" />
      <SummaryCard title="Total Expense" amount={expense} icon="expense" color="bg-red-500" />
      <SummaryCard title="Balance" amount={balance} icon="balance" color="bg-blue-500" />
    </div>
  );
};

export default Summary;
