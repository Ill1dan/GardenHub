
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logActivity } from './utils/activityLogger.js';

dotenv.config({ path: './.env' });

const testLog = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        console.log('Attempting to log activity...');
        await logActivity('Test Log Entry', 'info', null);
        console.log('Log function called.');

        setTimeout(() => {
            console.log('Exiting...');
            process.exit();
        }, 2000); // Give it a moment just in case

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

testLog();
