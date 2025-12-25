import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Plant from './models/Plant.js';
import Problem from './models/Problem.js';
import { generatePlantData } from './seeds/plantData.js';

dotenv.config();

const seedPlants = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing data
        await Plant.deleteMany({});
        await Problem.deleteMany({});
        console.log('Cleared existing Plant and Problem collections');

        const plantsData = generatePlantData();
        console.log(`Generated ${plantsData.length} plant entries to seed...`);

        // Batch insert plants first for speed?
        // No, I need the IDs to link problems.
        // Inserting one by one is safe for ensuring ID linkage. 
        // With 200 items it's fast enough.

        for (const data of plantsData) {
            const { problems, ...plantInfo } = data;

            // Create Plant
            const plant = new Plant(plantInfo);
            await plant.save();

            // Create Problems associated with this plant
            if (problems && problems.length > 0) {
                const problemDocs = problems.map(p => ({
                    name: p.name,
                    type: p.type,
                    symptoms: p.symptoms,
                    solution: p.solution,
                    plant_id: plant._id
                }));
                await Problem.insertMany(problemDocs);
            }
        }

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedPlants();
