import mongoose from 'mongoose';

const regionPlantSchema = new mongoose.Schema({
    region_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',
        required: true,
    },
    plant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant',
        required: true,
    },
});

// Compound index to ensure unique pairs
regionPlantSchema.index({ region_id: 1, plant_id: 1 }, { unique: true });

const RegionPlant = mongoose.model('RegionPlant', regionPlantSchema);
export default RegionPlant;
