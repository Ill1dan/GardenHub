
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SystemLog from './models/SystemLog.js';

dotenv.config({ path: './.env' });

const checkLogs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const count = await SystemLog.countDocuments();
        console.log(`Total System Logs: ${count}`);

        if (count > 0) {
            const logs = await SystemLog.find().sort({ createdAt: -1 }).limit(5);
            console.log('Recent Logs:', JSON.stringify(logs, null, 2));
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkLogs();
