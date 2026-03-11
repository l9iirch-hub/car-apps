import express from 'express';
import {
  createBooking,
  getBookingById,
  getMyBookings,
  getBookings,
  updateBookingStatus
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getBookings);

router.route('/mybookings')
  .get(protect, getMyBookings);

router.route('/:id')
  .get(protect, getBookingById);

router.route('/:id/status')
  .put(protect, admin, updateBookingStatus);

export default router;
