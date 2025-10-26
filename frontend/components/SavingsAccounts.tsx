
import React, { useState, useMemo } from 'react';
import { SavingsAccount } from '../types';
import { Icon } from './Icon';

interface SavingsAccountsProps {
    accounts: SavingsAccount[];
    onAddAccount: (name: string) => void;
    onAddFunds: (accountId: string, amount: number) => void;
}

const SavingsAccountCard: React.FC<{ account: SavingsAccount, onAddFunds: (accountId: string, amount: number) => void }> = ({ account, onAddFunds }) => {
    const [amountToAdd, setAmountToAdd] = useState('');

    const handleAddFunds = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(amountToAdd);
        if (amount > 0) {
            onAddFunds(account.id, amount);
            setAmountToAdd('');
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{account.name}</h3>
                    <Icon name="savings" className="h-8 w-8 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-2">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(account.balance)}
                </p>
            </div>
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
        </div>
    )
}

const SavingsAccounts: React.FC<SavingsAccountsProps> = ({ accounts, onAddAccount, onAddFunds }) => {
    const [name, setName] = useState('');

    const handleAddAccount = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAddAccount(name.trim());
            setName('');
        }
    };

    const totalSavings = useMemo(() => accounts.reduce((sum, acc) => sum + acc.balance, 0), [accounts]);

    return (
        <div className="space-y-6 lg:space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-300">Total Savings</h3>
                <p className="text-4xl font-bold text-green-600 dark:text-green-500">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSavings)}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Create New Savings Account</h2>
                <form onSubmit={handleAddAccount} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Account Name (e.g., Emergency Fund)"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
                    />
                    <button type="submit" className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors">
                        Create
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">My Accounts</h2>
                 {accounts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {accounts.map(account => <SavingsAccountCard key={account.id} account={account} onAddFunds={onAddFunds} />)}
                    </div>
                 ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">You haven't created any savings accounts yet.</p>
                 )}
            </div>
        </div>
    );
};

export default SavingsAccounts;
