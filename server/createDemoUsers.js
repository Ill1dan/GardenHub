
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config({ path: './.env' });

const createDemoUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const demos = [
            {
                name: 'Demo Viewer',
                email: 'viewer@gardenhub.com',
                password: hashedPassword,
                role: 'viewer',
                phone: '555-000-0001'
            },
            {
                name: 'Demo Gardener',
                email: 'gardener@gardenhub.com',
                password: hashedPassword,
                role: 'gardener',
                phone: '555-000-0002'
            },
            {
                name: 'Demo Admin',
                email: 'admin@gardenhub.com',
                password: hashedPassword,
                role: 'admin',
                phone: '555-000-0000'
            }
        ];

        for (const user of demos) {
            const exists = await User.findOne({ email: user.email });
            if (!exists) {
                await User.create(user);
                console.log(`Created ${user.role}: ${user.email}`);
            } else {
                console.log(`User ${user.email} already exists.`);
            }
        }

        console.log('Demo users check complete.');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createDemoUsers();
