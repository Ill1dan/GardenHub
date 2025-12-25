
import Problem from '../models/Problem.js';
import Plant from '../models/Plant.js';

// @desc    Search for problems
// @route   GET /api/problems/search
// @access  Public
export const searchProblems = async (req, res) => {
    try {
        const { symptom, type, plantType, plantName, page = 1, limit = 9 } = req.query;

        let problemQuery = {};

        // Filter by problem type (disease, pest, etc.)
        if (type) {
            problemQuery.type = type;
        }

        // Filter by symptom (regex search)
        if (symptom) {
            problemQuery.symptoms = { $regex: symptom, $options: 'i' };
        }

        // If filtering by Plant properties (type or name), we need to find those plants first
        if (plantType || plantName) {
            let plantQuery = {};
            if (plantType) {
                plantQuery.type = plantType;
            }
            if (plantName) {
                plantQuery.name = { $regex: plantName, $options: 'i' };
            }

            const plants = await Plant.find(plantQuery).select('_id');
            const plantIds = plants.map(p => p._id);

            problemQuery.plant_id = { $in: plantIds };
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const totalProblems = await Problem.countDocuments(problemQuery);
        const totalPages = Math.ceil(totalProblems / limitNum);

        const problems = await Problem.find(problemQuery)
            .populate('plant_id')
            .skip(skip)
            .limit(limitNum);

        res.status(200).json({
            problems,
            currentPage: pageNum,
            totalPages,
            totalProblems
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get filter options (symptoms, plant types)
// @route   GET /api/problems/filters
// @access  Public
export const getFilters = async (req, res) => {
    try {
        // Get unique plant types
        const plantTypes = await Plant.distinct('type');

        // Get common symptoms (this is harder to distinct because it's a string, not array)
        // We can just return a curated list or try to parse
        // For now, let's return a static list of common keywords or just let the frontend handle free text
        // But the UI wireframe implies "Choose Symptoms" -> maybe a list?
        // I'll return some common keywords used in our seed data.

        const commonSymptoms = [
            "Spots", "Yellowing", "Holes", "Wilting", "Mold", "Powder", "Rot", "Insects", "Sticky", "Curled Leaves", "Browning", "Webbing"
        ];

        res.status(200).json({
            plantTypes: plantTypes.sort(),
            commonSymptoms: commonSymptoms.sort()
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
