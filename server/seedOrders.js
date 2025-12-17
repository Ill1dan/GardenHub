import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ShopItem, Order } from './models/Shop.js';
import User from './models/User.js';  // Assuming User model exists, otherwise we'll create dummy users or just use IDs
import connectDB from './config/db.js';

dotenv.config();

const seedOrders = async () => {
    try {
        await connectDB();
        console.log('Seeding Orders...');

        // 1. Get all shop items
        const shopItems = await ShopItem.find({});
        if (shopItems.length === 0) {
            console.error('No shop items found. Please seed shop items first.');
            process.exit(1);
        }

        // 2. Clear existing orders
        await Order.deleteMany({});
        console.log('Cleared existing orders.');

        // 3. Define timeframes
        const now = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 6);

        // 4. Generate Orders
        const orders = [];

        // Helper to create random order
        const createOrder = (dateRangeStart, dateRangeEnd) => {
            const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
            const orderItems = [];
            let total = 0;

            for (let i = 0; i < numItems; i++) {
                const item = shopItems[Math.floor(Math.random() * shopItems.length)];
                const quantity = Math.floor(Math.random() * 2) + 1;
                const lineTotal = item.price * quantity;

                orderItems.push({
                    shop_item_id: item._id,
                    quantity,
                    unit_price: item.price,
                    line_total: lineTotal
                });
                total += lineTotal;
            }

            const orderDate = new Date(dateRangeStart.getTime() + Math.random() * (dateRangeEnd.getTime() - dateRangeStart.getTime()));

            // Dummy User ID (since we might not have users seeded, we can use a new ObjectId if validation allows, 
            // but let's try to fetch a user if possible or just use a dummy valid ID)
            const dummyUserId = new mongoose.Types.ObjectId();

            return {
                user_id: dummyUserId,
                items: orderItems,
                total_price: total,
                order_date: orderDate
            };
        };

        // Create "Trending" items (High sales in last 3 months)
        // Pick top 5 items to be trending
        const trendingItems = shopItems.slice(0, 5);
        console.log('Designated Trending Items:', trendingItems.map(i => i.name));

        // Generate specific orders for trending items in the last 3 months
        for (const item of trendingItems) {
            // Ensure > 5 sales
            const salesCount = Math.floor(Math.random() * 5) + 6; // 6 to 10 sales
            for (let i = 0; i < salesCount; i++) {
                const orderDate = new Date(threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime()));
                orders.push({
                    user_id: new mongoose.Types.ObjectId(),
                    items: [{
                        shop_item_id: item._id,
                        quantity: 1, // 1 sale = 1 quantity for simplicity of "sold 5 times" (or implies 5 orders? assuming 5 separate purchases)
                        unit_price: item.price,
                        line_total: item.price
                    }],
                    total_price: item.price,
                    order_date: orderDate
                });
            }
        }

        // Generate random orders for other items (some recent, some old)
        for (let i = 0; i < 50; i++) {
            // 50% chance of being recent, 50% old
            if (Math.random() > 0.5) {
                orders.push(createOrder(threeMonthsAgo, now));
            } else {
                orders.push(createOrder(sixMonthsAgo, threeMonthsAgo));
            }
        }

        await Order.insertMany(orders);
        console.log(`Seeded ${orders.length} orders.`);

        // 5. Update ShopItem 'sales' count based on these orders (Optional, but good for consistency)
        // Note: The prompt implies trending is calculated dynamically, but "sales" field might be static total. 
        // We will leave the "sales" field as is or update it? 
        // For strict "Sold more than 5 times" logic, we rely on the ORDERS query, not the static field.
        // However, updating the static field allows legacy sort to still work roughly correctly.

        console.log('Order seeding completed successfully.');
        process.exit();

    } catch (error) {
        console.error('Error seeding orders:', error);
        process.exit(1);
    }
};

seedOrders();
