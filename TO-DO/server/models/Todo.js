const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Todo", todoSchema);