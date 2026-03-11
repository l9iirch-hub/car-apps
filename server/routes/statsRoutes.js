import express from 'express';
import {
  getOverview,
  getBookingsChart
} from '../controllers/statsController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/overview').get(protect, admin, getOverview);
router.route('/bookings').get(protect, admin, getBookingsChart);

export default router;
