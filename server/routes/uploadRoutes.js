import express from 'express';
import upload from '../middleware/upload.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Upload image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    url: `/${req.file.path.replace(/\\/g, '/')}`,
  });
});

export default router;
