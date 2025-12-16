import mongoose from 'mongoose';

const servicePackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
});

const housePlantationServiceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    gardener_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServicePackage',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'completed', 'canceled'],
        default: 'pending',
    },
});

export const ServicePackage = mongoose.model('ServicePackage', servicePackageSchema);
export const HousePlantationService = mongoose.model('HousePlantationService', housePlantationServiceSchema);
