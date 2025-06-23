import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, DollarSign, Calendar, PieChart as PieChartIcon } from 'lucide-react';

const Dashboard = ({ expenses }) => {
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleDateString('en-US', { month: 'short' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const barData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount
  }));

  const COLORS = ['#3B82F6', '#8B5CF6', '#EF4444', '#F59E0B', '#10B981', '#F97316', '#6B7280'];

  const stats = [
    {
      title: 'Total Spending',
      value: `$${totalSpending.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-blue-500'
    },
    {
      title: 'This Month',
      value: `$${(monthlyData[new Date().toLocaleDateString('en-US', { month: 'short' })] || 0).toFixed(2)}`,
      icon: Calendar,
      color: 'text-purple-500'
    },
    {
      title: 'Categories',
      value: Object.keys(categoryData).length,
      icon: PieChartIcon,
      color: 'text-green-500'
    },
    {
      title: 'Transactions',
      value: expenses.length,
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {expenses.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  animationBegin={0}
                  animationDuration={1200}
                  animationEasing="ease-out"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$${value.toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    padding: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff'
                  }}
                  animationDuration={300}
                  wrapperStyle={{ zIndex: 10, transition: 'opacity 0.3s ease, transform 0.3s ease' }}
                  cursor={{ fill: 'transparent' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Monthly Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `$${value.toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    padding: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff'
                  }}
                  animationDuration={300}
                  wrapperStyle={{ zIndex: 10, transition: 'opacity 0.3s ease, transform 0.3s ease' }}
                  cursor={{ fill: 'transparent' }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                  animationBegin={0}
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;