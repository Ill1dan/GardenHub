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
}, { _id: false }); // Embeds don't necessarily need their own ID if just data

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
