const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const User = require("../../models/User");

router.post("/", async (req, res) => {
    try {
        const user = await User.findById(req.body.userID);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { title, content, img, categories, tags } = req.body;

        // Create a new post
        const newPost = new Post({
            title,
            content,
            img,
            userID: user._id,
            categories,
            tags
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.log("Error creating a new post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;