import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Car,
  Users,
  BarChart3,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: BookOpen, label: "Reservations", path: "/admin/reservations" },
    { icon: Car, label: "Cars", path: "/admin/cars" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: BarChart3, label: "Statistics", path: "/admin/stats" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-16 left-4 z-50 glass-card p-3 rounded-xl"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || mobileOpen) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", bounce: 0 }}
            className={`fixed lg:static lg:translate-x-0 inset-y-0 left-0 z-40 w-64 lg:w-72 bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-r border-white/10 shadow-2xl ${
              mobileOpen ? "block" : "hidden lg:block"
            }`}
            onClick={() => mobileOpen && setMobileOpen(false)}
          >
            {/* Logo/Top */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/70 rounded-xl flex items-center justify-center">
                  <Car className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">
                    Admin
                  </h2>
                  <span className="text-xs text-textMuted uppercase tracking-wider">
                    Panel
                  </span>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="p-4 space-y-1 mt-6">
              {navItems.map(({ icon: Icon, label, path }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary/20 border border-primary/40 text-primary font-semibold shadow-lg shadow-primary/20"
                        : "text-white/70 hover:text-white hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : "group-hover:text-primary"}`}
                    />
                    <span className="font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 bg-danger/20 border border-danger/30 hover:bg-danger/30 text-danger hover:text-red-100 rounded-xl transition-all font-medium"
              >
                <X className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={toggleSidebar}
              className="absolute -right-3 top-1/2 -translate-y-1/2 lg:block hidden bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full border border-white/20 shadow-lg"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
