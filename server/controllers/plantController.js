import Plant from '../models/Plant.js';

// @desc    Get all plants
// @route   GET /api/plants
// @access  Public
const getPlants = async (req, res) => {
    try {
        const plants = await Plant.find({});
        res.json(plants);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { getPlants };
