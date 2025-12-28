import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import SystemLog from '../models/SystemLog.js';
import { logActivity } from '../utils/activityLogger.js';

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
    });

    if (user) {
        // Log activity
        await logActivity(`New user registered: ${user.name} (${user.role})`, 'success', user._id);

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isPremium: user.isPremium,
            profilePicture: user.profilePicture,
            token: generateToken(user._id, user.role),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        if (user.isBanned) {
            return res.status(403).json({ message: 'Your account has been banned. Please contact support.' });
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isPremium: user.isPremium,
            profilePicture: user.profilePicture,
            token: generateToken(user._id, user.role),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    // User is already attached to req by middleware
    res.status(200).json(req.user);
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all gardeners
// @route   GET /api/users/gardeners
// @access  Public
const getGardeners = async (req, res) => {
    try {
        const gardeners = await User.find({ role: 'gardener' }).select('-password').sort({ createdAt: -1 });
        res.json(gardeners);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Ban/Unban user
// @route   PUT /api/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.isBanned = req.body.isBanned;
            const updatedUser = await user.save();
            res.json({ message: `User ${updatedUser.isBanned ? 'banned' : 'unbanned'}`, isBanned: updatedUser.isBanned });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.role = req.body.role || user.role;
            const updatedUser = await user.save();
            res.json({ message: `User role updated to ${updatedUser.role}`, role: updatedUser.role });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get Dashboard Stats
// @route   GET /api/users/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const viewers = await User.countDocuments({ role: 'viewer' });
        const gardeners = await User.countDocuments({ role: 'gardener' });
        const experts = await User.countDocuments({ role: 'expert' });

        res.json({
            totalUsers,
            viewers,
            gardeners,
            experts
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get System Activity Logs
// @route   GET /api/users/activity
// @access  Private/Admin
const getSystemLogs = async (req, res) => {
    try {
        const logs = await SystemLog.find({}).sort({ createdAt: -1 }).limit(10);
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.profilePicture = req.body.profilePicture || user.profilePicture;

            if (req.body.password) {
                // Determine if we need to hash the password
                // The User model likely has a pre-save hook for hashing, but let's check or just re-hash here if we want to be explicit.
                // Assuming the User model handles it or we do it here. 
                // Looking at registerUser, it does manual hashing. So we should probably do it here too if password is changed.
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                profilePicture: updatedUser.profilePicture,
                isPremium: updatedUser.isPremium,
                token: generateToken(updatedUser._id, updatedUser.role),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Upgrade user to premium
// @route   PUT /api/users/upgrade
// @access  Private
const upgradeToPremium = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.isPremium = true;

            // In a real app, we would handle payment processing here

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                profilePicture: updatedUser.profilePicture,
                isPremium: updatedUser.isPremium,
                token: generateToken(updatedUser._id, updatedUser.role),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { registerUser, loginUser, getMe, getAllUsers, getGardeners, updateUserStatus, updateUserRole, getDashboardStats, getSystemLogs, updateUserProfile, upgradeToPremium };
