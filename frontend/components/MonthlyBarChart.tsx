
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';

interface MonthlyBarChartProps {
  transactions: Transaction[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ transactions }) => {
  const data = useMemo(() => {
    const now = new Date();
    const currentMonthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    });
    
    const income = currentMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expense = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return [{ name: new Date().toLocaleString('default', { month: 'long' }), income, expense }];
  }, [transactions]);
  
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
          <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
          <YAxis tick={{ fill: '#9CA3AF' }} tickFormatter={(value) => `$${value}`} />
          <Tooltip 
             formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
             cursor={{fill: 'rgba(128, 128, 128, 0.1)'}}
             contentStyle={{ 
                 backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                 borderColor: '#4B5563',
                 borderRadius: '0.5rem'
             }}
          />
          <Legend />
          <Bar dataKey="income" fill="#22C55E" />
          <Bar dataKey="expense" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
