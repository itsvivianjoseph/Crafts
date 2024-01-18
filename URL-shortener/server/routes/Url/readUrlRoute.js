const express = require("express");
const router = express.Router();
const Url = require("../../models/Url");

router.get("/", async (req, res) => {
    try {
        const allUrls = await Url.find();
        res.statusCode(200).json({ allUrls });
    } catch (error) {
        console.error("Error retrieving all URLs:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const url = await Url.findById(req.params.id);

        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.statusCode(200).json({ url });
    } catch (error) {
        console.error("Error retrieving URL information:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router