import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config({ path: './.env' });

const resetDemoUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Delete existing demo users
        await User.deleteMany({ email: { $in: ['viewer@gardenhub.com', 'gardener@gardenhub.com', 'admin@gardenhub.com'] } });
        console.log('Deleted existing demo users');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const demos = [
            {
                name: 'Demo Viewer',
                email: 'viewer@gardenhub.com',
                password: hashedPassword,
                role: 'viewer',
                phone: '555-000-0001',
                profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
            },
            {
                name: 'Demo Gardener',
                email: 'gardener@gardenhub.com',
                password: hashedPassword,
                role: 'gardener',
                phone: '555-000-0002',
                profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
            },
            {
                name: 'Demo Admin',
                email: 'admin@gardenhub.com',
                password: hashedPassword,
                role: 'admin',
                phone: '555-000-0000',
                profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
            }
        ];

        await User.insertMany(demos);
        console.log('Re-created demo users with password: password123');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

resetDemoUsers();
