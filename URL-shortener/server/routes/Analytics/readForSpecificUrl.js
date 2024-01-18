const express = require("express");
const router = express.Router();
const Analytics = require("../../models/Analytics");

router.get("/:shortUrlKey", async (req, res) => {
    try {
        const analyticsData = await Analytics.find({ urlhash: req.params.shortUrlKey });

        res.json({ analytics: analyticsData });
    } catch (error) {
        console.error("Error retrieving URL analytics:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;