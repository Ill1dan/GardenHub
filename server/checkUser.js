import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const user = await User.findOne({ email: 'viewer@gardenhub.com' });
        if (user) {
            console.log('User found:', user.email, 'Role:', user.role);
            console.log('Password hash:', user.password);
        } else {
            console.log('User NOT found');
        }

        process.exit();
    } catch (error) {
        console.error('Error checking user:', error);
        process.exit(1);
    }
};

checkUser();
