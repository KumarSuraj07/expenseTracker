import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogOut, Moon, Sun, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="glass-card m-4 p-4">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <DollarSign className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              ExpenseTracker
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="btn-secondary p-2"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {currentUser && (
              <button
                onClick={handleLogout}
                className="btn-secondary p-2"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 pb-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;