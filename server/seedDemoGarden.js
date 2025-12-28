import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import UserPlant from './models/UserPlant.js';
import Plant from './models/Plant.js';
import connectDB from './config/db.js';

dotenv.config();

const seedDemoGarden = async () => {
    try {
        await connectDB();
        console.log('Database Connected');

        // 1. Find the demo user
        const demoEmail = 'viewer@gardenhub.com';
        const user = await User.findOne({ email: demoEmail });

        if (!user) {
            console.error('Demo user not found! Run createDemoUsers.js first.');
            process.exit(1);
        }

        console.log(`Found demo user: ${user.name} (${user._id})`);

        // 2. Clear existing plants for this user
        await UserPlant.deleteMany({ user_id: user._id });
        console.log('Cleared existing garden for demo user.');

        // 3. Find some base plants to add
        const plants = await Plant.find({});
        if (plants.length === 0) {
            console.error('No base plants found! Run seedPlants.js first.');
            process.exit(1);
        }

        // 4. Create sample user plants
        const plantNames = ['Tomato', 'Rose', 'Basil'];
        const selectedPlants = plants.filter(p => plantNames.includes(p.name));

        if (selectedPlants.length === 0) {
            console.log('Could not find exact matches for Tomato, Rose, Basil. Using first 3 available plants.');
            selectedPlants.push(...plants.slice(0, 3));
        }

        const userPlants = selectedPlants.map(plant => ({
            user_id: user._id,
            plant_id: plant._id,
            nickname: `My ${plant.name}`,
            date_planted: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
            last_watered: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
            last_fertilized: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
            last_pruned: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
            is_healthy: true
        }));

        await UserPlant.insertMany(userPlants);
        console.log(`Successfully added ${userPlants.length} plants to the demo garden!`);

        process.exit();
    } catch (error) {
        console.error('Error seeding demo garden:', error);
        process.exit(1);
    }
};

seedDemoGarden();
