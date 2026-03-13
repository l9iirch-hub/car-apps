import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../../services/api";
import DataTable from "../../../components/common/DataTable";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      setUsers(response.data.users || response.data || []);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleUpdate = async (id, role) => {
    try {
      await api.patch(`/users/${id}/role`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure? This action cannot be undone.")) {
      try {
        await api.delete(`/users/${id}`);
        toast.success("User deleted");
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const columns = [
    {
      key: "avatar",
      label: "Avatar",
      render: (_, row) => (
        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-primary font-semibold text-xl uppercase">
          {row.name?.[0] || "?"}
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "role",
      label: "Role",
      render: (value, row) => (
        <select
          value={value}
          onChange={(e) => handleRoleUpdate(row._id, e.target.value)}
          className="px-3 py-1 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    {
      key: "bookings",
      label: "Bookings",
      render: (_, row) => row.bookingCount || 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              User Management
            </h1>
            <p className="text-textMuted">
              Manage your platform users ({users.length})
            </p>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        emptyState="No users found"
        className="shadow-2xl"
        actions={[
          <button
            key="refresh"
            className="p-2 text-textMuted hover:text-white hover:bg-white/10 rounded-lg"
          >
            <Search className="w-4 h-4" />
          </button>,
        ]}
      />

      {/* Stats */}
      {!loading && users.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {users.filter((u) => u.role === "user").length}
            </div>
            <div className="text-textMuted uppercase tracking-wide text-sm">
              Regular Users
            </div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {users.filter((u) => u.role === "admin").length}
            </div>
            <div className="text-textMuted uppercase tracking-wide text-sm">
              Admins
            </div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {users.reduce((sum, u) => sum + (u.bookingCount || 0), 0)}
            </div>
            <div className="text-textMuted uppercase tracking-wide text-sm">
              Total Bookings
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Users;
