import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { ServicePackage } from './models/Service.js';

dotenv.config();
connectDB();

const servicePackages = [
    {
        name: "Urban Balcony",
        description: "Transform your balcony into a cozy green retreat. Perfect for small spaces, this package includes space-saving vertical planters and low-maintenance plants.",
        price: 15000,
        features: [
            "Vertical Garden Setup",
            "5 Low-maintenance Plants",
            "Automatic Drip Irrigation",
            "Seasonal Flower Rotation"
        ],
        recommended_size: "Small (< 50 sq ft)",
        image_url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2664&auto=format&fit=crop"
    },
    {
        name: "Rooftop Oasis",
        description: "Turn your rooftop into a stunning garden paradise. Includes heavy-duty planters, fruit trees, and a shaded seating area design.",
        price: 45000,
        features: [
            "10 Large Planters",
            "3 Fruit Trees (Grafted)",
            "Soil & Compost Mix",
            "Pergola Design Consultation",
            "Monthly Maintenance (3 months)"
        ],
        recommended_size: "Large (> 500 sq ft)",
        image_url: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2670&auto=format&fit=crop"
    },
    {
        name: "Indoor Sanctuary",
        description: "Bring nature inside with our air-purifying plant collection and stylish aesthetic pots.",
        price: 8000,
        features: [
            "5 Air-purifying Plants (Snake Plant, Pothos, etc.)",
            "Ceramic & Terracotta Pots",
            "Plant Care Guide",
            "Placement Consultation"
        ],
        recommended_size: "Indoor",
        image_url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop"
    }
];

const importData = async () => {
    try {
        await ServicePackage.deleteMany(); // Clear existing
        await ServicePackage.insertMany(servicePackages);
        console.log('Service Packages Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

importData();
