const express = require("express");
const router = express.Router();
const Url = require("../../models/Url");

router.get("/:shortUrlKey", async (req, res) => {
    try {
        const url = await Url.findOne({ short_url_key: req.params.shortUrlKey });

        if (!url) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        url.clicks += 1;

        await url.save();

        res.redirect(url.original_url);
    } catch (error) {
        console.error("Error redirecting to original URL:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;