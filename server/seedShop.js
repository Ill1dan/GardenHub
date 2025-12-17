import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ShopItem } from './models/Shop.js';
import connectDB from './config/db.js';

dotenv.config();

// Helper to get random item from array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

// Data source for generation
const adjectives = ['Organic', 'Fresh', 'Premium', 'Heirloom', 'Exotic', 'Wild', 'Homegrown', 'Award-Winning', 'Sweet', 'Rare'];
const categories = ['Flowers', 'Vegetables', 'Fruits'];
const baseItems = {
    'Flowers': ['Roses', 'Tulips', 'Orchids', 'Lilies', 'Sunflowers', 'Daisies', 'Peonies', 'Hydrangeas', 'Lavenders', 'Marigolds', 'Succulents', 'Cactus', 'Bonsai', 'Ferns', 'Begonias'],
    'Vegetables': ['Tomatoes', 'Carrots', 'Potatoes', 'Cucumbers', 'Peppers', 'Spinach', 'Kale', 'Lettuce', 'Onions', 'Garlic', 'Zucchini', 'Broccoli', 'Cauliflower', 'Eggplant', 'Radishes'],
    'Fruits': ['Strawberries', 'Blueberries', 'Apples', 'Oranges', 'Lemons', 'Limes', 'Peaches', 'Pears', 'Grapes', 'Cherries', 'Watermelons', 'Melons', 'Figs', 'Plums', 'Raspberries']
};
const gardeners = [
    { name: 'Sarah Green', rating: 4.9 },
    { name: 'Tom Farmer', rating: 4.7 },
    { name: 'Lily Bloom', rating: 5.0 },
    { name: 'Berry Fields', rating: 4.8 },
    { name: 'Root Veggies', rating: 4.6 },
    { name: 'Herb Haven', rating: 4.5 },
    { name: 'Orchard Hills', rating: 4.8 },
    { name: 'Floral Fantasy', rating: 4.9 },
    { name: 'Green Thumb', rating: 4.7 },
    { name: 'Nature Best', rating: 4.6 }
];

const images = {
    'Flowers': [
        'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=600', // Red Rose
        'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&q=80&w=600', // Pink Flower
        'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&q=80&w=600', // White Flower
        'https://images.unsplash.com/photo-1490750967868-58cb9bdda3fa?auto=format&fit=crop&q=80&w=600', // Summer Flowers
        'https://images.unsplash.com/photo-1563245372-f21727382d56?auto=format&fit=crop&q=80&w=600', // Orchid
        'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=600', // Sunflower
        'https://images.unsplash.com/photo-1558281050-4c33cb27e1b5?auto=format&fit=crop&q=80&w=600', // Colorful
        'https://images.unsplash.com/photo-1588616330058-2946c0d832d2?auto=format&fit=crop&q=80&w=600'  // Tulips
    ],
    'Vegetables': [
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600', // Potatoes
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600', // Tomatoes
        'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=600', // Veggies basket
        'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=600', // Veggies dark
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600', // Salad
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600', // Carrots
        'https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&q=80&w=600'  // Green Veggies
    ],
    'Fruits': [
        'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600', // Oranges
        'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=600', // Strawberry
        'https://images.unsplash.com/photo-1537166948252-0c91bd9b031c?auto=format&fit=crop&q=80&w=600', // Strawberry 2
        'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&q=80&w=600', // Cherries
        'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=600', // Banana
        'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600', // Berries
        'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=600'  // Pineapple
    ]
};

const generateShopItems = (count) => {
    const items = [];
    for (let i = 0; i < count; i++) {
        const category = getRandom(categories);
        const baseName = getRandom(baseItems[category]);
        const adjective = getRandom(adjectives);
        const name = `${adjective} ${baseName}`;
        const gardener = getRandom(gardeners);

        // Random date within last year
        const date = new Date();
        date.setDate(date.getDate() - getRandomInt(1, 365));

        items.push({
            name: name,
            price: getRandomFloat(2, 50),
            stock: getRandomInt(0, 100),
            category: category,
            description: `High quality ${name.toLowerCase()} grown with care. Perfect for your garden or kitchen. Sourced directly from ${gardener.name}.`,
            image_url: getRandom(images[category]),
            gardener: gardener,
            sales: getRandomInt(0, 1000),
            createdAt: date.toISOString()
        });
    }
    return items;
};

const shopItems = generateShopItems(60);

const seedShop = async () => {
    try {
        await connectDB();

        console.log('Seeding Shop Items...');

        // Clear existing items
        await ShopItem.deleteMany({});
        console.log('Cleared existing shop items.');

        // Insert new items
        await ShopItem.insertMany(shopItems);
        console.log('Inserted new shop items.');

        console.log('Shop seeding completed successfully.');
        process.exit();
    } catch (error) {
        console.error('Error seeding shop:', error);
        process.exit(1);
    }
};

seedShop();
