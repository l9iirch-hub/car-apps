import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import User from '../models/User.js';

// @desc    Get stats overview
// @route   GET /api/stats/overview
// @access  Private/Admin
export const getOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalCars = await Car.countDocuments({});
    const totalBookings = await Booking.countDocuments({});
    
    // Calculate total revenue from confirmed/completed
    const revenueStats = await Booking.aggregate([
      { 
        $match: { 
          status: { $in: ['confirmed', 'active', 'completed'] } 
        } 
      },
      { 
        $group: { 
          _id: null, 
          total: { $sum: '$totalPrice' } 
        } 
      }
    ]);

    const revenue = revenueStats.length > 0 ? revenueStats[0].total : 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalCars,
        totalBookings,
        revenue
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get bookings over time for charts
// @route   GET /api/stats/bookings
// @access  Private/Admin
export const getBookingsChart = async (req, res) => {
  try {
    // Group by month
    const result = await Booking.aggregate([
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" }, 
            month: { $month: "$createdAt" } 
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
