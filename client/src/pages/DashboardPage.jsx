import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { api } from "../services/api";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      logout();
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await api.get("/bookings/mybookings");
        setBookings(response.data.bookings || []);
      } catch (error) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
        <div className="glass-card p-12 rounded-2xl animate-pulse">
          <div className="h-8 bg-white/10 rounded w-32 mb-4 mx-auto"></div>
          <div className="space-y-3">
            <div className="h-32 bg-white/10 rounded-lg mx-auto w-full"></div>
            <div className="h-32 bg-white/10 rounded-lg mx-auto w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-primary/20 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 rounded-2xl mb-12 text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6 border-4 border-white/20"></div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">
            {user?.name}
          </h2>
          <p className="text-primary text-xl font-semibold mb-6">
            {user?.email}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/cars" className="btn-primary px-8 py-3 text-lg">
              Rent Another Car
            </Link>
            <button
              onClick={logout}
              className="px-8 py-3 bg-transparent border-2 border-white/30 hover:border-danger hover:bg-danger/20 text-white rounded-xl font-semibold transition-all"
            >
              Sign Out
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass-card p-8 rounded-xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {bookings.length}
            </div>
            <div className="text-textMuted uppercase tracking-wide text-sm">
              Active Bookings
            </div>
          </div>
          <div className="glass-card p-8 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">0</div>
            <div className="text-textMuted uppercase tracking-wide text-sm">
              Upcoming
            </div>
          </div>
          <div className="glass-card p-8 rounded-xl text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">0</div>
            <div className="text-textMuted uppercase tracking-wide text-sm">
              Completed
            </div>
          </div>
        </motion.div>

        {/* Recent Bookings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            Recent Bookings
            {bookings.length === 0 && (
              <span className="text-textMuted text-sm">(No bookings yet)</span>
            )}
          </h3>

          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-textMuted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                No bookings yet
              </h4>
              <p className="text-textMuted mb-6">
                Rent your first luxury vehicle to see your booking history here.
              </p>
              <Link to="/cars" className="btn-primary px-8 py-3">
                Browse Cars
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 3).map((booking) => (
                <div
                  key={booking._id}
                  className="flex gap-6 p-6 border border-white/10 rounded-xl hover:border-primary/50 transition-all"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-semibold text-primary">
                      {booking.car?.brand?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-lg truncate">
                      {booking.car?.name}
                    </h4>
                    <div className="flex gap-4 text-sm text-textMuted mb-1">
                      <span>
                        {new Date(booking.startDate).toLocaleDateString()}
                      </span>
                      <span>→</span>
                      <span>
                        {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-primary font-semibold">
                      ${booking.totalPrice?.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : booking.status === "active"
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {booking.status?.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
              {bookings.length > 3 && (
                <div className="text-center pt-6 border-t border-white/10">
                  <Link
                    to="/bookings"
                    className="text-primary hover:underline font-medium"
                  >
                    View all bookings ({bookings.length})
                  </Link>
                </div>
              )}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default DashboardPage;
