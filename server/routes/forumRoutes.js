import express from 'express';
import { getAllPosts, createPost } from '../controllers/forumController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', protect, createPost);

export default router;
