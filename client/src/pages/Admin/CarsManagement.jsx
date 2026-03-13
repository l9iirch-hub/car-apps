import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCarStore } from "../../../store/carStore";
import DataTable from "../../../components/common/DataTable";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../../../services/api";

const CarsManagement = () => {
  const { cars, loading, setCarsData } = useCarStore();
  const [tableLoading, setTableLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    seats: "",
    fuel: "",
    transmission: "",
    location: "",
    images: null,
    available: true,
  });

  const fetchCars = async () => {
    setTableLoading(true);
    try {
      const response = await api.get("/cars");
      setCarsData(response.data);
    } catch (error) {
      toast.error("Failed to load cars");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images" && formData[key]) {
          Array.from(formData[key]).forEach((file) =>
            data.append("images", file),
          );
        } else if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });

      if (editingCar) {
        await api.put(`/cars/${editingCar._id}`, data);
        toast.success("Car updated successfully");
      } else {
        await api.post("/cars", data);
        toast.success("Car added successfully");
      }
      fetchCars();
      setShowAddModal(false);
      setEditingCar(null);
      setFormData({
        name: "",
        brand: "",
        model: "",
        year: "",
        pricePerDay: "",
        seats: "",
        fuel: "",
        transmission: "",
        location: "",
        images: null,
        available: true,
      });
    } catch (error) {
      toast.error("Failed to save car");
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      pricePerDay: car.pricePerDay,
      seats: car.seats,
      fuel: car.fuel,
      transmission: car.transmission,
      location: car.location,
      images: null,
      available: car.available,
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this car?")) {
      try {
        await api.delete(`/cars/${id}`);
        toast.success("Car deleted");
        fetchCars();
      } catch (error) {
        toast.error("Failed to delete car");
      }
    }
  };

  const columns = [
    {
      key: "images[0].url",
      label: "Image",
      render: (value) => (
        <img
          src={value || "/placeholder-car.jpg"}
          alt="Car"
          className="w-16 h-12 object-cover rounded-lg"
        />
      ),
    },
    { key: "name", label: "Name" },
    { key: "brand", label: "Brand" },
    { key: "model", label: "Model" },
    { key: "pricePerDay", label: "Price/Day", render: (value) => `$${value}` },
    {
      key: "available",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {value ? "Available" : "Booked"}
        </span>
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
            Cars Management
          </h1>
          <p className="text-textMuted">Manage your vehicle fleet</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Car
        </motion.button>
      </motion.div>

      {/* Cars Table */}
      <DataTable
        columns={columns}
        data={cars}
        loading={tableLoading}
        emptyState="No cars found. Add your first vehicle to get started."
        actions={[
          <button
            key="refresh"
            className="p-2 text-textMuted hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            Refresh
          </button>,
        ]}
      />

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">
                  {editingCar ? "Edit Car" : "Add New Car"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Car Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) =>
                        setFormData({ ...formData, model: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({ ...formData, year: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      min="1900"
                      max="2025"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Price per Day ($)
                    </label>
                    <input
                      type="number"
                      value={formData.pricePerDay}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerDay: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      min="10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Seats
                    </label>
                    <input
                      type="number"
                      value={formData.seats}
                      onChange={(e) =>
                        setFormData({ ...formData, seats: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      min="1"
                      max="10"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Fuel Type
                    </label>
                    <select
                      value={formData.fuel}
                      onChange={(e) =>
                        setFormData({ ...formData, fuel: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      required
                    >
                      <option value="">Select Fuel</option>
                      <option value="Gasoline">Gasoline</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Transmission
                    </label>
                    <select
                      value={formData.transmission}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          transmission: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      required
                    >
                      <option value="">Select Transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    placeholder="City, Airport, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Images (Multiple)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, images: e.target.files })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all"
                  />
                  <p className="text-xs text-textMuted mt-1">
                    Upload up to 8 high-quality images (recommended 1200x800)
                  </p>
                </div>
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          available: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-primary focus:ring-primary/50 rounded"
                    />
                    <span className="text-white">Available for booking</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {editingCar ? "Update Car" : "Add Car"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingCar(null);
                    }}
                    className="flex-1 border border-white/20 hover:border-primary text-white hover:bg-white/5 py-3 px-6 rounded-xl transition-all font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarsManagement;
