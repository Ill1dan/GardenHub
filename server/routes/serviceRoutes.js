import express from 'express';
import { ServicePackage, HousePlantationService } from '../models/Service.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all service packages
// @route   GET /api/services/packages
// @access  Public
router.get('/packages', async (req, res) => {
    try {
        const packages = await ServicePackage.find({});
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Get single service package by ID
// @route   GET /api/services/packages/:id
// @access  Public
router.get('/packages/:id', async (req, res) => {
    try {
        const pkg = await ServicePackage.findById(req.params.id);
        if (pkg) {
            res.json(pkg);
        } else {
            res.status(404).json({ message: 'Package not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Create a new service request (Manual or Package)
// @route   POST /api/services/request
// @access  Private
router.post('/request', protect, async (req, res) => {
    const { service_type, package_id, custom_details, date, gardener_id } = req.body;
    console.log('Incoming Request Body:', req.body); // Debug log

    try {
        const serviceRequest = new HousePlantationService({
            user_id: req.user._id,
            service_type,
            package_id: service_type === 'package' ? package_id : undefined,
            custom_details: service_type === 'manual' ? custom_details : undefined,
            gardener_id,
            date: date || Date.now()
        });

        const createdRequest = await serviceRequest.save();
        res.status(201).json(createdRequest);

    } catch (error) {
        res.status(400).json({ message: 'Invalid data: ' + error.message });
    }
});

// @desc    Get logged in user's service requests
// @route   GET /api/services/my-requests
// @access  Private
router.get('/my-requests', protect, async (req, res) => {
    try {
        const requests = await HousePlantationService.find({ user_id: req.user._id })
            .populate('package_id')
            .populate('gardener_id', 'name email')
            .sort({ date: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get requests where current user is the gardener
// @route   GET /api/services/gardener-requests
// @access  Private (Gardener/Expert)
router.get('/gardener-requests', protect, async (req, res) => {
    try {
        const requests = await HousePlantationService.find({ gardener_id: req.user._id })
            .populate('user_id', 'name email')
            .populate('package_id')
            .sort({ date: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Update service request status
// @route   PUT /api/services/request/:id/status
// @access  Private (Gardener/Admin)
router.put('/request/:id/status', protect, async (req, res) => {
    const { status } = req.body;
    try {
        const request = await HousePlantationService.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Verify that the logged in user is the assigned gardener or an admin
        if (request.gardener_id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        request.status = status;
        const updatedRequest = await request.save();
        res.json(updatedRequest);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
