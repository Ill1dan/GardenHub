import express from 'express';
import { getPlants } from '../controllers/plantController.js';

const router = express.Router();

router.get('/', getPlants);

export default router;
