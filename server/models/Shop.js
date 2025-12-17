import mongoose from 'mongoose';

const shopItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    image_url: {
        type: String,
    },
    sales: {
        type: Number,
        default: 0
    },
    // For now, embedding gardener info to match the requested dummy data structure directly.
    // In a future iteration, this could be a reference to the User model.
    gardener: {
        name: { type: String, required: true },
        rating: { type: Number, default: 0 }
    },
    gardener_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true // Making it optional for now to support old seed data without it, or we should update seed
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const orderItemSchema = new mongoose.Schema({
    shop_item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShopItem',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    unit_price: {
        type: Number,
        required: true,
    },
    line_total: {
        type: Number,
        required: true,
    },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [orderItemSchema],
    total_price: {
        type: Number,
        required: true,
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
});

export const ShopItem = mongoose.model('ShopItem', shopItemSchema);
export const Order = mongoose.model('Order', orderSchema);
