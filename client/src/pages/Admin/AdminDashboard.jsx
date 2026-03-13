import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { api } from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import toast from "react-hot-toast";
import DataTable from "../../components/common/DataTable";
import StatCard from "../../components/admin/StatCard";
import { Eye, Download, Filter, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  const [stats, setStats] = useState({});
  const [bookingsChart, setBookingsChart] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("Admin access required");
      logout();
      return;
    }

    const fetchStats = async () => {
      setLoading(true);
      try {
        const [overviewRes, bookingsRes, recentRes] = await Promise.all([
          api.get("/stats/overview"),
          api.get("/stats/bookings"),
          api.get("/bookings?limit=5&sort=-createdAt")
        ]);
        setStats(overviewRes.data.data);
        setBookingsChart(bookingsRes.data.data);
        setRecentBookings(recentRes.data.bookings || recentRes.data || []);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
        <div className="glass-card p-12 rounded-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-textMuted text-center">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const formatBookingsData = () => {
    return bookingsChart.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      bookings: item.count,
    }));
  };

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-textMuted mb-2">
              <button className="p-1 -ml-1 hover:text-primary transition-colors">Dashboard</button>
              <span>/</span>
              <span>Overview</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-textMuted mt-2">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary px-6 py-2.5 text-sm">View Reports</button>
            <button className="glass-card px-6 py-2.5 border border-white/20 hover:border-primary text-sm transition-all">Export</button>
          </div>
        </div>
      </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard.Users value={stats.totalUsers || 0} label="Total Users" change={12} />
  <StatCard.Revenue value={`$${stats.revenue?.toLocaleString() || 0}`} label="Revenue" change={8} />
          <StatCard.Cars value={stats.totalCars || 0} label="Fleet Size" change={3} />
          <StatCard.Bookings value={stats.totalBookings || 0} label="Bookings" change={-2} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <button className="glass-card p-6 rounded-xl hover:border-primary border border-white/20 hover:shadow-lg group transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20">
                <Filter className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Manage Fleet</h4>
                <p className="text-textMuted text-sm">Add, edit cars</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary font-medium">
              Go to Cars <Eye className="w-4 h-4" />
            </div>
          </button>
          <button className="glass-card p-6 rounded-xl hover:border-primary border border-white/20 hover:shadow-lg group transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Bookings</h4>
                <p className="text-textMuted text-sm">View all reservations</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-400 font-medium">
              Go to Bookings <Eye className="w-4 h-4" />
            </div>
          </button>
          <button className="glass-card p-6 rounded-xl hover:border-primary border border-white/20 hover:shadow-lg group transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20">
                <Download className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Reports</h4>
                <p className="text-textMuted text-sm">Export data & analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-medium">
              Generate Report <Download className="w-4 h-4" />
            </div>
          </button>
        </motion.div>

        {/* Recent Bookings Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="glass-card p-6 rounded-2xl mb-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              Recent Reservations
              <span className="text-sm text-textMuted font-normal">(last 5)</span>
            </h3>
          </div>
          <DataTable
            columns={[
              { key: 'user.name', label: 'Customer' },
              { key: 'car.name', label: 'Car' },
              { 
                key: 'startDate', 
                label: 'Dates',
                render: (value, row) => (
                  <span className="text-textMuted">
                    {new Date(value).toLocaleDateString()} - {new Date(row.endDate).toLocaleDateString()}
                  </span>
                )
              },
              { key: 'status', label: 'Status' },
              { 
                key: 'totalPrice', 
                label: 'Amount',
                render: (value) => `$${value?.toLocaleString()}`
              }
            ]}
            data={recentBookings}
            emptyState="No recent bookings"
          />
        </motion.section>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Bookings Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={formatBookingsData()}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="month" stroke="#ccc" fontSize={12} />
                <YAxis stroke="#ccc" fontSize={12} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#d4af37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={formatBookingsData()}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="month" stroke="#ccc" fontSize={12} />
                <YAxis stroke="#ccc" fontSize={12} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#d4af37"
                  fill="url(#gradient)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
    </>
  );
};

export default AdminDashboard;
