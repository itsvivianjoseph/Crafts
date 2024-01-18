const express = require("express");
const router = express.Router();
const Url = require("../../models/Url");

router.delete("/:id", async (req, res) => {
    try {
        // Validate that req.params.id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const deletedUrl = await Url.findByIdAndDelete(req.params.id);

        if (!deletedUrl) {
            return res.status(404).json({ error: "No URLs found with the given ID" });
        }

        res.status(200).json({ message: "URL deleted successfully", deletedUrl });
    } catch (error) {
        console.error("Some error occurred...");
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;