import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserPlant from './models/UserPlant.js';

dotenv.config();

const clearUserPlants = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        await UserPlant.deleteMany({});
        console.log('Cleared UserPlant collection');

        process.exit();
    } catch (error) {
        console.error('Failed to clear UserPlants:', error);
        process.exit(1);
    }
};

clearUserPlants();
