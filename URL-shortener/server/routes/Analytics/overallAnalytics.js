const express = require("express");
const router = express.Router();
const Analytics = require("../../models/Analytics");

router.get("/", async (req, res) => {
    try {
        const allAnalyticsData = await Analytics.find();
        res.json(allAnalyticsData);
    } catch (error) {
        console.error("Error retrieving overall analytics data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router