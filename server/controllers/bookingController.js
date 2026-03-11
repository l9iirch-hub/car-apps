import Booking from '../models/Booking.js';
import Car from '../models/Car.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  const {
    car,
    startDate,
    endDate,
    totalDays,
    totalPrice,
    pickupLocation,
    returnLocation,
    driverLicense,
  } = req.body;

  try {
    if (!car) {
      return res.status(400).json({ success: false, message: 'No car provided' });
    }

    const booking = new Booking({
      user: req.user._id,
      car,
      startDate,
      endDate,
      totalDays,
      totalPrice,
      pickupLocation,
      returnLocation,
      driverLicense,
    });

    const createdBooking = await booking.save();
    
    // Update car availability if needed
    // Note: Depends on business logic, here we just keep it simple
    res.status(201).json({ success: true, booking: createdBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('car', 'name brand model images');

    if (booking) {
      // Allow only admin or the user who made the booking
      if (req.user.role === 'admin' || booking.user._id.toString() === req.user._id.toString()) {
        res.json({ success: true, booking });
      } else {
        res.status(403).json({ success: false, message: 'Not authorized to view this booking' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('car', 'name brand model images pricePerDay')
      .sort({ createdAt: -1 });
      
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('car', 'name brand model')
      .sort({ createdAt: -1 });
      
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = status;
      const updatedBooking = await booking.save();
      res.json({ success: true, booking: updatedBooking });
    } else {
      res.status(404).json({ success: false, message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
