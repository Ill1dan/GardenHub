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
}, { timestamps: true });

const UserPlant = mongoose.model('UserPlant', userPlantSchema);
export default UserPlant;
