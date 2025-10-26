
import React, { useMemo } from 'react';
import { Budget, Transaction } from '../types';
import { Icon } from './Icon';

interface BudgetsProps {
    budgets: Budget[];
    transactions: Transaction[];
    setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
}

const expenseCategories = ['Groceries', 'Transport', 'Bills', 'Entertainment', 'Dining Out', 'Shopping', 'Health', 'Other'];

const Budgets: React.FC<BudgetsProps> = ({ budgets, transactions, setBudgets }) => {

    const monthlyExpenses = useMemo(() => {
        const now = new Date();
        return transactions.filter(t => {
            const tDate = new Date(t.date);
            return t.type === 'expense' && tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
        });
    }, [transactions]);

    const handleBudgetChange = (category: string, amount: string) => {
        const numericAmount = parseFloat(amount) || 0;
        const existingBudget = budgets.find(b => b.category === category);
        if (existingBudget) {
            setBudgets(budgets.map(b => b.category === category ? { ...b, amount: numericAmount } : b));
        } else {
            setBudgets([...budgets, { category, amount: numericAmount }]);
        }
    };
    
    const budgetData = useMemo(() => {
        return expenseCategories.map(category => {
            const budget = budgets.find(b => b.category === category)?.amount || 0;
            const spent = monthlyExpenses
                .filter(t => t.category === category)
                .reduce((sum, t) => sum + t.amount, 0);
            return { category, budget, spent };
        });
    }, [budgets, monthlyExpenses]);
    
    const totalBudget = useMemo(() => budgets.reduce((sum, b) => sum + b.amount, 0), [budgets]);
    const totalSpent = useMemo(() => monthlyExpenses.filter(t => t.category !== 'Goal Contribution').reduce((sum, t) => sum + t.amount, 0), [monthlyExpenses]);

    return (
        <div className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-300">Total Monthly Budget</h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalBudget)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h3 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-300">Total Spent This Month</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSpent)}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Category Budgets</h2>
                <div className="space-y-4">
                    {budgetData.map(({ category, budget, spent }) => {
                        const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
                        const progressBarColor = percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500';

                        return (
                            <div key={category}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold">{category}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(spent)} / {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(budget)}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div className={`${progressBarColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor={`budget-${category}`} className="sr-only">Set budget for {category}</label>
                                    <input
                                        id={`budget-${category}`}
                                        type="number"
                                        placeholder="Set Budget"
                                        min="0"
                                        step="10"
                                        className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
                                        value={budget || ''}
                                        onChange={e => handleBudgetChange(category, e.target.value)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Budgets;
