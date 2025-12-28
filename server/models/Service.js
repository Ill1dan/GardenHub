import mongoose from 'mongoose';

const servicePackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    features: [{
        type: String, // e.g., "5 Plants", "Weekly Maintenance"
    }],
    image_url: {
        type: String, // URL to a representative image
    },
    recommended_size: {
        type: String, // e.g., "Small Balcony", "Standard Garden"
    }
});

const housePlantationServiceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service_type: {
        type: String,
        enum: ['package', 'manual'],
        required: true,
        default: 'package'
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServicePackage',
        // Required only if service_type is 'package'
    },
    custom_details: {
        area_type: String, // e.g., Rooftop, Garden
        area_size: String, // e.g., 500sqft
        requirements: String, // User's text description
        budget_range: String,
    },
    gardener_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'in_progress', 'completed', 'canceled'],
        default: 'pending',
    },
});

export const ServicePackage = mongoose.model('ServicePackage', servicePackageSchema);
export const HousePlantationService = mongoose.model('HousePlantationService', housePlantationServiceSchema);
