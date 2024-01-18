const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    urlhash: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date, 
        default: Date.now 
    },
    device_type: {
        type: String,
        enum: ['desktop', 'mobile', 'tablet', 'other'],
        required: true,
    },
    browser: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;