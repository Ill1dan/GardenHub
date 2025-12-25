import express from 'express';
import { searchProblems, getFilters } from '../controllers/problemController.js';

const router = express.Router();

router.get('/search', searchProblems);
router.get('/filters', getFilters);

export default router;
