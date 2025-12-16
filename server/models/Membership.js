import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, // One membership per user
    },
    type: {
        type: String,
        enum: ['basic', 'premium'],
        required: true,
    },
    start_date: {
        type: Date,
        default: Date.now,
    },
    end_date: {
        type: Date,
    },
    discount_rate: {
        type: Number,
        default: 0,
    },
});

const Membership = mongoose.model('Membership', membershipSchema);
export default Membership;
