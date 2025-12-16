import mongoose from 'mongoose';

const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    climate: {
        type: String,
        required: true,
    },
    soil_type: {
        type: String,
        required: true,
    },
    recommendation: {
        type: String,
    },
});

const Region = mongoose.model('Region', regionSchema);
export default Region;
