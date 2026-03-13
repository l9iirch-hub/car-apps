import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCarStore } from "../store/carStore";
import { carService } from "../services/carService";
import { useAuthStore } from "../store/authStore";
import { bookingService } from "../services/bookingService"; // Will create
import toast from "react-hot-toast";

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { car, setCar } = useCarStore();
  const { user } = useAuthStore();
  const [bookingForm, setBookingForm] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    driverLicense: "",
  });
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [totalDays, setTotalDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const response = await carService.getCar(id);
        setCar(response.car);
      } catch (error) {
        toast.error("Car not found");
        navigate("/cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate]);

  const handleDateChange = (dateType) => (date) => {
    setBookingForm((prev) => ({ ...prev, [dateType]: date }));
    if (dateType === "startDate" && bookingForm.endDate) {
      const days = Math.ceil(
        (new Date(bookingForm.endDate) - new Date(date)) /
          (1000 * 60 * 60 * 24),
      );
      setTotalDays(Math.max(1, days));
    }
  };

  useEffect(() => {
    if (car.pricePerDay && totalDays) {
      setTotalPrice(car.pricePerDay * totalDays);
    }
  }, [car.pricePerDay, totalDays]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book");
      navigate("/login");
      return;
    }

    setBookingLoading(true);
    try {
      const bookingData = {
        car: car._id,
        startDate: bookingForm.startDate,
        endDate: bookingForm.endDate,
        totalDays,
        totalPrice,
        pickupLocation: bookingForm.pickupLocation,
        driverLicense: bookingForm.driverLicense,
      };

      await bookingService.createBooking(bookingData);
      toast.success("Booking created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gradient-to-br from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.button
          whileHover={{ scale: 0.95 }}
          className="mb-12 text-textMuted hover:text-white flex items-center gap-2 group"
          onClick={() => navigate("/cars")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Fleet
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Car Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-[4/3] glass-card rounded-2xl overflow-hidden">
              <img
                src={car.images?.[0]?.url}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>

            {car.images && car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {car.images.slice(1, 5).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/50 transition-all"
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Car Info & Booking */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-baseline gap-4 mb-4">
                <h1 className="text-4xl font-display font-bold text-white">
                  {car.name}
                </h1>
                <span className="text-2xl text-primary font-bold">
                  ${car.pricePerDay}
                </span>
                <span className="text-textMuted text-lg">/day</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-textMuted mb-6">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {car.brand} {car.model} {car.year}
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.85a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    />
                  </svg>
                  {car.location}
                </span>
                <span>
                  {car.seats} seats • {car.transmission} • {car.fuel}
                </span>
              </div>

              {/* Features */}
              <div className="glass-card p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {car.features?.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-textMuted text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-8">
                Book This Vehicle
              </h3>

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      Start Date
                    </label>
                    <input
                      type="date"
                      onChange={handleDateChange("startDate")}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-3">
                      End Date
                    </label>
                    <input
                      type="date"
                      onChange={handleDateChange("endDate")}
                      className="input-field w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={bookingForm.pickupLocation}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        pickupLocation: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="Airport, Hotel, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Driver's License
                  </label>
                  <input
                    type="text"
                    value={bookingForm.driverLicense}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        driverLicense: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="DL-123456789"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>
                      {totalDays} days × ${car.pricePerDay}/day
                    </span>
                    <span className="font-bold text-white">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={bookingLoading || !user}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primaryHover hover:to-primary text-black font-bold py-5 px-8 rounded-xl text-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {bookingLoading
                      ? "Creating Booking..."
                      : `Book Now - $${totalPrice.toLocaleString()}`}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
