import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { motion } from "framer-motion";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-primary/10">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:ml-72 pt-16 lg:pt-0"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default AdminLayout;
