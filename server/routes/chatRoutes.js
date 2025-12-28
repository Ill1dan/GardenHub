import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { sendMessage, getConversation, getInbox, getExperts } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/inbox', protect, getInbox);
router.get('/experts', protect, getExperts);
router.get('/:userId', protect, getConversation);

export default router;
