import UserPlant from '../models/UserPlant.js';

// @desc    Get user's plants
// @route   GET /api/user-plants
// @access  Private
const getUserPlants = async (req, res) => {
    try {
        const userPlants = await UserPlant.find({ user_id: req.user._id }).populate('plant_id');
        res.json(userPlants);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a plant to user's collection
// @route   POST /api/user-plants
// @access  Private
const addUserPlant = async (req, res) => {
    const { plant_id, custom_water_days, custom_fertilize_days, custom_prune_days } = req.body;

    try {
        const userPlant = new UserPlant({
            user_id: req.user._id,
            plant_id,
            custom_water_days,
            custom_fertilize_days,
            custom_prune_days
        });

        const createdUserPlant = await userPlant.save();
        // Populate plant details before returning
        await createdUserPlant.populate('plant_id');
        res.status(201).json(createdUserPlant);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Remove a plant from user's collection
// @route   DELETE /api/user-plants/:id
// @access  Private
const removeUserPlant = async (req, res) => {
    try {
        const userPlant = await UserPlant.findById(req.params.id);

        if (userPlant) {
            if (userPlant.user_id.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await userPlant.deleteOne();
            res.json({ message: 'Plant removed' });
        } else {
            res.status(404).json({ message: 'Plant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update plant activity (log care)
// @route   PATCH /api/user-plants/:id/activity
// @access  Private
const updatePlantActivity = async (req, res) => {
    const { activityType } = req.body; // 'water', 'fertilize', 'prune'

    try {
        const userPlant = await UserPlant.findById(req.params.id);

        if (userPlant) {
            if (userPlant.user_id.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            if (activityType === 'water') {
                userPlant.last_watered = Date.now();
            } else if (activityType === 'fertilize') {
                userPlant.last_fertilized = Date.now();
            } else if (activityType === 'prune') {
                userPlant.last_pruned = Date.now();
            } else {
                return res.status(400).json({ message: 'Invalid activity type' });
            }

            const updatedUserPlant = await userPlant.save();
            await updatedUserPlant.populate('plant_id');
            res.json(updatedUserPlant);
        } else {
            res.status(404).json({ message: 'Plant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { getUserPlants, addUserPlant, removeUserPlant, updatePlantActivity };
