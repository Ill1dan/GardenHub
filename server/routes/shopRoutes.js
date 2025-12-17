import express from 'express';
import { getShopItems, getShopItemById, createShopItem, updateShopItemStock, deleteShopItem } from '../controllers/shopController.js';
import { protect, gardener } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getShopItems);
router.post('/', protect, gardener, createShopItem);
router.get('/:id', getShopItemById);
router.put('/:id/stock', protect, gardener, updateShopItemStock);
router.delete('/:id', protect, gardener, deleteShopItem);

export default router;
