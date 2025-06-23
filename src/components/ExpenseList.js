import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Calendar, Tag } from 'lucide-react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-red-500',
      Transport: 'bg-blue-500',
      Entertainment: 'bg-purple-500',
      Shopping: 'bg-pink-500',
      Bills: 'bg-yellow-500',
      Health: 'bg-green-500',
      Other: 'bg-gray-500'
    };
    return colors[category] || colors.Other;
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {expenses.map((expense) => (
          <motion.div
            key={expense.id}
            className="glass-card p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{expense.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(expense.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span className={`px-2 py-1 rounded-full text-white text-xs ${getCategoryColor(expense.category)}`}>
                      {expense.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onEdit(expense)}
                  className="btn-secondary p-2"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="btn-secondary p-2 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {expenses.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No expenses yet. Add your first expense!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ExpenseList;