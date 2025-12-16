import mongoose from 'mongoose';

const plantActivitySchema = new mongoose.Schema({
    user_plant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserPlant',
        required: true,
    },
    activity_type: {
        type: String,
        enum: ['watered', 'fertilized', 'pruned'],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const PlantActivity = mongoose.model('PlantActivity', plantActivitySchema);
export default PlantActivity;
