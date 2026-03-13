import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../../services/api";
import StatCard from "../../../components/admin/StatCard";
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import toast from "react-hot-toast";

const COLORS = ["#d4af37", "#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

const Stats = () => {
  const [stats, setStats] = useState({});
  const [chartsData, setChartsData] = useState({
    bookingsByMonth: [],
    carsByBrand: [],
    revenueByCar: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllStats = async () => {
      setLoading(true);
      try {
        const [overviewRes, bookingsRes, revenueRes] = await Promise.all([
          api.get("/stats/overview"),
          api.get("/stats/bookings"),
          api.get("/stats/revenue"),
        ]);
        setStats(overviewRes.data.data);
        setChartsData({
          bookingsByMonth: bookingsRes.data.data,
          carsByBrand: overviewRes.data.carsByBrand || [],
          revenueByCar: revenueRes.data.data || [],
        });
      } catch (error) {
        toast.error("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const formatBookingsData = () =>
    chartsData.bookingsByMonth.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      bookings: item.count,
    }));

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard.Revenue
            value={stats.revenue}
            label="Total Revenue"
            change={15}
          />
          <StatCard.Bookings
            value={stats.totalBookings}
            label="Bookings"
            change={22}
          />
          <StatCard.Cars
            value={stats.totalCars}
            label="Fleet Size"
            change={5}
          />
          <StatCard.Users
            value={stats.totalUsers}
            label="Active Users"
            change={18}
          />
        </div>
      </motion.section>

      {/* Charts Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {/* Bookings Trend */}
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Bookings Trend</h3>
            <div className="text-primary font-semibold">+12% MoM</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={formatBookingsData()}>
              <defs>
                <linearGradient
                  id="bookingsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="month"
                stroke="#ccc"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#ccc"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#10b981"
                fill="url(#bookingsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Car Type */}
        <div className="glass-card p-8 rounded-2xl lg:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Top Revenue Cars</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartsData.revenueByCar.slice(0, 8)}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="name"
                stroke="#ccc"
                fontSize={11}
                tickLine={false}
                angle={-45}
                height={80}
              />
              <YAxis stroke="#ccc" fontSize={12} tickLine={false} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#d4af37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cars by Brand Pie */}
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Fleet by Brand</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartsData.carsByBrand.slice(0, 6)}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="brand"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartsData.carsByBrand.slice(0, 6).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Utilization Rate */}
        <div className="glass-card p-8 rounded-2xl lg:col-span-2 xl:col-span-2">
          <h3 className="text-xl font-bold text-white mb-6">
            Fleet Utilization
          </h3>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">
                {stats.utilizationRate || 0}%
              </div>
              <div className="text-textMuted">Utilization Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">
                {stats.avgRentalDays || 0}
              </div>
              <div className="text-textMuted">Avg Rental Duration</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Summary Metrics */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Performance Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white">
                  {stats.totalRevenue30d || 0}
                </h4>
                <p className="text-textMuted text-sm">Last 30d Revenue</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white">
                  {stats.completedBookings || 0}
                </h4>
                <p className="text-textMuted text-sm">Completed Trips</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white">
                  {stats.activeUsers || 0}
                </h4>
                <p className="text-textMuted text-sm">Active Users</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-white">
                  {stats.totalReviews || 0}
                </h4>
                <p className="text-textMuted text-sm">Customer Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Stats;
