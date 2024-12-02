const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');
const {
    getUserProfile,
    getAllUsers,
    getSystemOverview
} = require('../controllers/userController');

const router = express.Router();

// Profile route - accessible by all authenticated users
router.get('/profile', protect, getUserProfile);

// Admin only routes
router.get('/admin/users', protect, roleCheck(['admin']), getAllUsers);
router.get('/admin/system-overview', protect, roleCheck(['admin']), getSystemOverview);

module.exports = router;
