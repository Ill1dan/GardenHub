import express from 'express';
import { registerUser, loginUser, getMe, getAllUsers, getGardeners, updateUserStatus, updateUserRole, getDashboardStats, getSystemLogs, updateUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/gardeners', getGardeners);
router.put('/profile', protect, updateUserProfile);

// Admin Routes
router.get('/', protect, admin, getAllUsers);
router.get('/stats', protect, admin, getDashboardStats);
router.get('/activity', protect, admin, getSystemLogs);
router.put('/:id/status', protect, admin, updateUserStatus);
router.put('/:id/role', protect, admin, updateUserRole);

export default router;
