import express from 'express';
import { getUserPlants, addUserPlant, removeUserPlant, updatePlantActivity } from '../controllers/userPlantController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUserPlants).post(protect, addUserPlant);
router.route('/:id').delete(protect, removeUserPlant);
router.route('/:id/activity').patch(protect, updatePlantActivity);

export default router;
