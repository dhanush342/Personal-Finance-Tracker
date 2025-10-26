
import React, { useState } from 'react';
import { Goal } from '../types';
import { Icon } from './Icon';

interface FinancialGoalsProps {
    goals: Goal[];
    onAddGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
    onAddFunds: (goalId: string, amount: number) => void;
}

const GoalCard: React.FC<{ goal: Goal, onAddFunds: (goalId: string, amount: number) => void }> = ({ goal, onAddFunds }) => {
    const [amountToAdd, setAmountToAdd] = useState('');
    const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
    const isComplete = goal.currentAmount >= goal.targetAmount;

    const handleAddFunds = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(amountToAdd);
        if (amount > 0) {
            onAddFunds(goal.id, amount);
            setAmountToAdd('');
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{goal.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Target: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(goal.targetAmount)}
                    </p>
                </div>
                <Icon name="goal" className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-4">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(goal.currentAmount)}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(percentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${isComplete ? 'bg-green-500' : 'bg-blue-600'}`} style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
            {!isComplete && (
                 <form onSubmit={handleAddFunds} className="mt-4 flex items-center space-x-2">
                    <input
                        type="number"
                        value={amountToAdd}
                        onChange={(e) => setAmountToAdd(e.target.value)}
                        placeholder="Amount"
                        min="0.01"
                        step="0.01"
                        required
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
                    />
                    <button type="submit" className="py-1.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm shadow-md transition-colors">
                        Add Funds
                    </button>
                </form>
            )}
            {isComplete && (
                <p className="text-center mt-4 font-semibold text-green-600 dark:text-green-500">Goal Achieved! 🎉</p>
            )}
        </div>
    )
}


const FinancialGoals: React.FC<FinancialGoalsProps> = ({ goals, onAddGoal, onAddFunds }) => {
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(targetAmount);
        if (name && amount > 0) {
            onAddGoal({ name, targetAmount: amount });
            setName('');
            setTargetAmount('');
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Add New Goal</h2>
                <form onSubmit={handleAddGoal} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Goal Name (e.g., New Car)"
                        required
                        className="md:col-span-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
                    />
                     <input
                        type="number"
                        value={targetAmount}
                        onChange={e => setTargetAmount(e.target.value)}
                        placeholder="Target Amount"
                        min="1"
                        step="1"
                        required
                        className="md:col-span-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
                    />
                    <button type="submit" className="md:col-span-1 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors">
                        Set Goal
                    </button>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map(goal => <GoalCard key={goal.id} goal={goal} onAddFunds={onAddFunds} />)}
            </div>
        </div>
    );
};

export default FinancialGoals;
