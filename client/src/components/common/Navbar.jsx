import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isHome ? 'bg-transparent py-6' : 'glass-nav py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <span>Luxe</span><span className="text-primary">Drive</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/cars" className="text-sm font-medium text-white/80 hover:text-primary transition-colors">Fleet</Link>
          <Link to="/about" className="text-sm font-medium text-white/80 hover:text-primary transition-colors">Experience</Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="text-sm font-medium text-white/80 hover:text-primary transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-danger hover:text-red-400 transition-colors">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-white hover:text-primary transition-colors">Log In</Link>
              <Link to="/register" className="bg-primary/10 border border-primary text-primary px-5 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-black transition-all">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
