import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    water_freq: {
        type: String,
        required: true,
    },
    sunlight: {
        type: String,
        required: true,
    },
    fertilizer_freq: {
        type: String,
    },
    diseases: {
        type: String,
    },
    growth_conditions: {
        type: String,
    },
    image: {
        type: String,
    },
    scientific_name: {
        type: String,
    },
});

const Plant = mongoose.model('Plant', plantSchema);
export default Plant;
