const express = require("express");
const router = express.Router();
const Url = require("../../models/Url");

router.put("/:id", async (req, res) => {
    try {
        const { original_url, short_url_key } = req.body;
        const updatedUrl = await Url.findByIdAndUpdate(
            req.params.id,
            { original_url, short_url_key },
            { new: true }
        );

        if (!updatedUrl) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.json(updatedUrl);
    } catch (error) {
        console.error("Error updating URL:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ee - extend-expiration
router.put("/ee/:id", async (req, res) => {
    try {
        const { expires_at } = req.body;
        const extendedUrl = await Url.findByIdAndUpdate(
            req.params.id,
            { expires_at },
            { new: true }
        );

        if (!extendedUrl) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.json(extendedUrl);
    } catch (error) {
        console.error("Error extending expiration time:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router