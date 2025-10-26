
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction } from '../types';

interface CategoryPieChartProps {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ transactions }) => {
  const data = useMemo(() => {
    const excludedCategories = ['Goal Contribution', 'Savings Transfer'];
    const expenseByCategory = transactions
      .filter(t => t.type === 'expense' && !excludedCategories.includes(t.category))
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (data.length === 0) {
    return (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            No expense data to display.
        </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
             formatter={(value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)}
             contentStyle={{ 
                 backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                 borderColor: '#4B5563',
                 borderRadius: '0.5rem'
             }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
