import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ForumPost } from './models/Forum.js';
import User from './models/User.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

await connectDB();

const samplePosts = [
    {
        title: "How to grow tomatoes in a pot?",
        content: "I have a small balcony and I want to grow tomatoes. What size pot do I need? Any specific soil recommendations? I've heard cherry tomatoes are easier for beginners."
    },
    {
        title: "Best fertilizer for roses",
        content: "My roses are looking a bit yellow. I've tried general purpose fertilizer but it doesn't seem to help much. Someone suggested bone meal. Has anyone tried that?"
    },
    {
        title: "Succulent propagation tips needed",
        content: "I have a few succulents that are getting leggy. I want to propagate them. detailed steps would be appreciated! Do I let the cuttings callus over first?"
    },
    {
        title: "Dealing with Aphids naturally",
        content: "My vegetable garden is infested with aphids. I don't want to use chemical pesticides. Is neem oil effective? Or should I buy ladybugs?"
    },
    {
        title: "Winter gardening in Zone 5",
        content: "It's getting cold here. What vegetables can I still plant in late October? I have a raised bed. Maybe garlic or spinach?"
    },
    {
        title: "Indoor plant lighting",
        content: "My apartment doesn't get much sunlight. Can anyone recommend good grow lights that aren't too expensive/energy consuming? I want to grow herbs."
    },
    {
        title: "Composting for beginners",
        content: "I want to start composting kitchen scraps. Do I need a special bin? what is the ratio of greens to browns? Worried about smell."
    },
    {
        title: "Orchid care help!",
        content: "My orchid's flowers fell off and the leaves are wrinkly. Am I overwatering or underwatering? I water it once a week with an ice cube (as read online)."
    },
    {
        title: "Starting a herb garden",
        content: "Which herbs are easiest to grow from seed vs transplants? Basil, mint, cilantro, rosemary. Any tips for keeping them alive indoors?"
    },
    {
        title: "Pruning hydrangeas",
        content: "When is the best time to prune hydrangeas? I have the big blue mophead ones. I don't want to cut off next year's blooms by mistake."
    },
    {
        title: "Soil pH testing",
        content: "How crucial is soil pH for a general flower garden? Is a cheap probe from the hardware store accurate enough?"
    },
    {
        title: "Container gardening drainage",
        content: "I drilled holes in my plastic pots but water seems to sit at the bottom. Should I add rocks at the bottom? Or better potting mix?"
    },
    {
        title: "Pest identification",
        content: "Found these small black bugs jumping on my eggplant leaves. They make small holes. Are they flea beetles? How to treat?"
    },
    {
        title: "Harvesting basil",
        content: "How do I harvest basil to encourage it to keep growing? Do I pick the big leaves or cut the stems? It's starting to flower."
    },
    {
        title: "Watering schedule for succulents",
        content: "I killed my last succulent by overwatering. How do you know when they truly need water? The soil feels dry on top but maybe not deep down."
    }
];

const seedForum = async () => {
    try {
        await ForumPost.deleteMany(); // Clear existing posts to avoid duplicates if run multiple times
        console.log('Existing forum posts cleared.');

        const users = await User.find();

        if (users.length === 0) {
            console.log('No users found. Please seed users first.');
            process.exit(1);
        }

        const forumPosts = samplePosts.map((post, index) => {
            const randomUser = users[index % users.length]; // Distribute posts among users
            return {
                user_id: randomUser._id,
                title: post.title,
                content: post.content
            };
        });

        await ForumPost.insertMany(forumPosts);

        console.log('Forum posts seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedForum();
