const express = require("express");
const router = express.Router();
const Analytics = require("../../models/Analytics");

router.post("/", async (req, res) => {
    try {
        const { urlhash, device_type, browser, country } = req.body;
        const newAnalyticsData = new Analytics({
            urlhash,
            device_type,
            browser,
            country,
        });

        const savedAnalyticsData = await newAnalyticsData.save();
        res.json(savedAnalyticsData);
    } catch (error) {
        console.error("Error adding analytics data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router