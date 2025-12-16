
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config({ path: './.env' });

const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateUser = (role, index) => {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    return {
        name: `${firstName} ${lastName}`,
        email: `${role}${index + 1}_${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`,
        password: 'password123', // Will be hashed
        phone: `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
        role: role,
        isBanned: Math.random() < 0.05, // 5% chance of being banned initially for variety
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random past date
    };
};

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Pre-hash password for performance
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const users = [];

        // 55 Viewers
        console.log('Generating Viewers...');
        for (let i = 0; i < 55; i++) {
            const u = generateUser('viewer', i);
            u.password = hashedPassword;
            users.push(u);
        }

        // 25 Gardeners
        console.log('Generating Gardeners...');
        for (let i = 0; i < 25; i++) {
            const u = generateUser('gardener', i);
            u.password = hashedPassword;
            users.push(u);
        }

        // 6 Experts
        console.log('Generating Experts...');
        for (let i = 0; i < 6; i++) {
            const u = generateUser('expert', i);
            u.password = hashedPassword;
            users.push(u);
        }

        await User.insertMany(users);
        console.log(`Successfully seeded ${users.length} users!`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUsers();
