import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  CarFront,
  Calendar,
  TrendingUp,
  Users as UsersIcon,
} from "lucide-react";

const StatCard = ({
  value,
  label,
  icon: Icon,
  change = 0,
  color = "primary",
  className = "",
}) => {
  const colors = {
    primary: "text-primary ring-primary/20",
    green: "text-green-400 ring-green-500/20",
    gold: "text-yellow-400 ring-yellow-500/20",
    blue: "text-blue-400 ring-blue-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        glass-card p-8 rounded-2xl relative overflow-hidden group
        border border-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20
        transition-all duration-300 ${colors[color]} ${className}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity" />

      {/* Icon */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="w-10 h-10 opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent from-white via-white to-slate-200">
          {value?.toLocaleString?.() || value || 0}
        </div>
        <div className="text-sm uppercase tracking-wide font-semibold text-white/70 mb-1">
          {label}
        </div>

        {change !== undefined && (
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp
              className={`w-3 h-3 ${change >= 0 ? "text-green-400" : "text-red-400"}`}
            />
            <span
              className={`${change >= 0 ? "text-green-400" : "text-red-400"} font-medium`}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-textMuted">vs last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

StatCard.Users = () => <Users className="w-6 h-6" />;
StatCard.Revenue = () => <DollarSign className="w-6 h-6" />;
StatCard.Cars = () => <CarFront className="w-6 h-6" />;
StatCard.Bookings = () => <Calendar className="w-6 h-6" />;

export default StatCard;
