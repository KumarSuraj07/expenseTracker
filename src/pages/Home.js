import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../utils/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import Dashboard from '../components/Dashboard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import toast from 'react-hot-toast';

const Home = () => {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    let unsubscribe = () => {};
    
    const fetchExpenses = async () => {
      try {
        const q = query(
          collection(db, 'expenses'),
          where('userId', '==', currentUser.uid)
        );
        
        unsubscribe = onSnapshot(q, 
          (snapshot) => {
            const expenseData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            // Sort manually instead of using orderBy
            expenseData.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
            setExpenses(expenseData);
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching expenses:', error);
            toast.error('Error loading expenses');
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error setting up expenses listener:', error);
        setLoading(false);
      }
    };
    
    fetchExpenses();
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    let filtered = expenses;

    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(expense => expense.category === categoryFilter);
    }

    setFilteredExpenses(filtered);
  }, [expenses, searchTerm, categoryFilter]);

  const handleAddExpense = async (expenseData) => {
    try {
      await addDoc(collection(db, 'expenses'), {
        ...expenseData,
        userId: currentUser.uid,
        createdAt: new Date()
      });
      toast.success('Expense added successfully!');
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to add expense');
    }
  };

  const handleUpdateExpense = async (expenseData) => {
    try {
      const expenseRef = doc(db, 'expenses', editingExpense.id);
      await updateDoc(expenseRef, expenseData);
      toast.success('Expense updated successfully!');
      setShowForm(false);
      setEditingExpense(null);
    } catch (error) {
      toast.error('Failed to update expense');
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteDoc(doc(db, 'expenses', expenseId));
      toast.success('Expense deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'expenses' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            Expenses
          </button>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Expense
        </button>
      </motion.div>

      {activeTab === 'expenses' && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field pl-12 pr-10 appearance-none bg-no-repeat bg-right rounded-xl border-2 border-blue-500/20 focus:border-blue-500 focus:ring focus:ring-blue-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                style={{
                  backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%233B82F6%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1.5em 1.5em"
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Dashboard expenses={expenses} />
          </motion.div>
        ) : (
          <motion.div
            key="expenses"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <ExpenseForm
            expense={editingExpense}
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
            onClose={() => {
              setShowForm(false);
              setEditingExpense(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;