import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['viewer', 'gardener', 'admin', 'expert'],
        default: 'viewer',
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=150&q=80', // Neutral profile placeholder
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
