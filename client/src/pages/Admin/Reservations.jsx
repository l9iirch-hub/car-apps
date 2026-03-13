import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../../services/api";
import DataTable from "../../../components/common/DataTable";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const Reservations = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", search: "" });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.search) params.append("search", filters.search);
      const response = await api.get(`/bookings?${params.toString()}`);
      setBookings(response.data.bookings || response.data || []);
    } catch (error) {
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filters]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      toast.success("Status updated");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Cancel this reservation?")) {
      try {
        await api.delete(`/bookings/${id}`);
        toast.success("Reservation cancelled");
        fetchBookings();
      } catch (error) {
        toast.error("Failed to cancel");
      }
    }
  };

  const columns = [
    {
      key: "user.name",
      label: "Customer",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-primary font-semibold text-lg">
            {row.user?.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <div className="font-semibold text-white">{row.user?.name}</div>
            <div className="text-textMuted text-sm">{row.user?.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "car.name",
      label: "Car",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.car?.images?.[0]?.url || "/placeholder-car.jpg"}
            alt={row.car?.name}
            className="w-12 h-9 object-cover rounded-lg"
          />
          <div>
            <div className="font-semibold text-white truncate max-w-[150px]">
              {row.car?.name}
            </div>
            <div className="text-textMuted text-xs">
              {row.car?.brand} {row.car?.model}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "startDate",
      label: "Dates",
      render: (value, row) => (
        <div className="text-sm">
          <div className="font-semibold">
            {new Date(value).toLocaleDateString()}
          </div>
          <div className="text-textMuted text-xs">
            → {new Date(row.endDate).toLocaleDateString()}
          </div>
          <div className="text-xs text-textMuted">{row.totalDays} days</div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
            value === "confirmed"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : value === "pending"
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                : value === "cancelled"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "totalPrice",
      label: "Total",
      render: (value) => (
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            ${value?.toLocaleString()}
          </div>
          <div className="text-textMuted text-sm">
            ${(value / row.totalDays || 0).toFixed(0)}/day
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Reservations
          </h1>
          <p className="text-textMuted">
            Manage customer bookings ({bookings.length})
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-2xl"
      >
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input
              placeholder="Search bookings..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={fetchBookings}
            className="glass-card px-6 py-3 border border-white/20 hover:border-primary text-sm font-medium transition-all"
          >
            <Filter className="inline w-4 h-4 mr-1" />
            Filters
          </button>
        </div>
      </motion.div>

      {/* Bookings Table */}
      <DataTable
        columns={columns}
        data={bookings}
        loading={loading}
        emptyState="No reservations found"
        className="sticky top-0 z-10"
        actions={[
          <div key="status-actions" className="flex gap-1">
            <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-all">
              <CheckCircle className="w-4 h-4" />
            </button>
            <button className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-all">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all">
              <XCircle className="w-4 h-4" />
            </button>
          </div>,
        ]}
      />

      {/* Stats Cards */}
      {!loading && bookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="glass-card p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {bookings.filter((b) => b.status === "pending").length}
            </div>
            <div className="text-textMuted text-xs uppercase tracking-wider">
              Pending
            </div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {bookings.filter((b) => b.status === "confirmed").length}
            </div>
            <div className="text-textMuted text-xs uppercase tracking-wider">
              Confirmed
            </div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {bookings.filter((b) => b.status === "active").length}
            </div>
            <div className="text-textMuted text-xs uppercase tracking-wider">
              Active
            </div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-1">
              {bookings.filter((b) => b.status === "cancelled").length}
            </div>
            <div className="text-textMuted text-xs uppercase tracking-wider">
              Cancelled
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Reservations;
