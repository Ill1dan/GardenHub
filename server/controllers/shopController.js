import { ShopItem, Order } from '../models/Shop.js';

// @desc    Get all shop items
// @route   GET /api/shop
// @access  Public
export const getShopItems = async (req, res) => {
    try {
        const { trending, gardener_id } = req.query;

        if (trending === 'true') {
            console.log('Fetching trending items...');
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

            const trendingStats = await Order.aggregate([
                { $match: { order_date: { $gte: threeMonthsAgo } } },
                { $unwind: "$items" },
                { $group: { _id: "$items.shop_item_id", count: { $sum: "$items.quantity" } } },
                { $match: { count: { $gt: 5 } } }
            ]);

            const trendingIds = trendingStats.map(stat => stat._id);
            const items = await ShopItem.find({ _id: { $in: trendingIds } });
            return res.json(items);
        }

        // Standard filtering
        let query = {};
        if (gardener_id) {
            query.gardener_id = gardener_id;
        }

        const items = await ShopItem.find(query);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get shop item by ID
// @route   GET /api/shop/:id
// @access  Public
export const getShopItemById = async (req, res) => {
    try {
        const item = await ShopItem.findById(req.params.id);

        if (item) {
            // Calculate total sales dynamically from Orders
            const salesStats = await Order.aggregate([
                { $unwind: "$items" },
                { $match: { "items.shop_item_id": item._id } },
                { $group: { _id: null, totalSales: { $sum: "$items.quantity" } } }
            ]);

            const totalSales = salesStats.length > 0 ? salesStats[0].totalSales : 0;

            // Return item with dynamic sales count
            // We convert to object to modify it without affecting the document if we were saving (which we aren't)
            const itemWithSales = item.toObject();
            itemWithSales.sales = totalSales;

            res.json(itemWithSales);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(500).json({ message: 'Server Error' });
        }
    }
}


// @desc    Create a new shop item
// @route   POST /api/shop
// @access  Private/Gardener
export const createShopItem = async (req, res) => {
    try {
        const { name, price, stock, category, description, image_url } = req.body;

        const shopItem = new ShopItem({
            name,
            price,
            stock,
            category,
            description,
            image_url,
            gardener: {
                name: req.user.name,
                rating: 0 // New gardeners start with 0 rating or fetch actual rating? For now 0.
            },
            gardener_id: req.user._id
        });

        const createdItem = await shopItem.save();
        res.status(201).json(createdItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update shop item stock
// @route   PUT /api/shop/:id/stock
// @access  Private/Gardener
export const updateShopItemStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body; // Quantity to ADD

        const item = await ShopItem.findById(id);

        if (item) {
            // Check if user is the gardener who created the item OR admin
            // Note: Seeded items might not have gardener_id, so we might need a fallback check or allow all gardeners for legacy items?
            // For strictness: toString() comparison
            if (req.user.role === 'admin' || (item.gardener_id && item.gardener_id.toString() === req.user._id.toString())) {
                item.stock += Number(quantity);
                const updatedItem = await item.save();
                res.json(updatedItem);
            } else {
                res.status(401).json({ message: 'Not authorized to update this item' });
            }
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete shop item
// @route   DELETE /api/shop/:id
// @access  Private/Admin/Gardener
export const deleteShopItem = async (req, res) => {
    try {
        const item = await ShopItem.findById(req.params.id);

        if (item) {
            // Check authorization: Admin or Owner
            if (req.user.role === 'admin' || (item.gardener_id && item.gardener_id.toString() === req.user._id.toString())) {
                await item.deleteOne();
                res.json({ message: 'Product removed' });
            } else {
                res.status(401).json({ message: 'Not authorized to delete this item' });
            }
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
