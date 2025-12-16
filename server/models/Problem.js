import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['disease', 'pest', 'weed', 'environmental'],
        required: true,
    },
    symptoms: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    plant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant',
    }
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;
