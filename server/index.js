import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('GardenHub API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
