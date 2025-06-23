import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

const ExpenseForm = ({ onSubmit, onClose, expense = null }) => {
  const [formData, setFormData] = useState({
    title: expense?.title || '',
    amount: expense?.amount || '',
    category: expense?.category || 'Food',
    date: expense?.date || new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      id: expense?.id || Date.now().toString()
    });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card p-6 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {expense ? 'Edit Expense' : 'Add Expense'}
          </h2>
          <button onClick={onClose} className="btn-secondary p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Expense title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="input-field"
            step="0.01"
            required
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="input-field appearance-none bg-no-repeat bg-right rounded-xl border-2 border-blue-500/20 focus:border-blue-500 focus:ring focus:ring-blue-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm"
            style={{
              backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem"
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="input-field"
            required
          />

          <button type="submit" className="btn-primary w-full">
            <Plus className="w-5 h-5 mr-2" />
            {expense ? 'Update Expense' : 'Add Expense'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseForm;