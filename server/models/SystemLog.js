import mongoose from 'mongoose';

const systemLogSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['info', 'warning', 'success', 'error'],
        default: 'info',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, { timestamps: true });

const SystemLog = mongoose.model('SystemLog', systemLogSchema);

export default SystemLog;
