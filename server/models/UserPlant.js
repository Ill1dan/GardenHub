import mongoose from 'mongoose';

const userPlantSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    plant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant',
        required: true,
    },
    custom_water_days: {
        type: Number, // Interval in days
    },
    custom_fertilize_days: {
        type: Number,
    },
    custom_prune_days: {
        type: Number,
    },
    last_watered: {
        type: Date,
        default: Date.now
    },
    last_fertilized: {
        type: Date,
        default: Date.now
    },
    last_pruned: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

const UserPlant = mongoose.model('UserPlant', userPlantSchema);
export default UserPlant;
