const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

// Update a specific post by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Partially update a specific post by ID
router.patch("/:id", async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Error patching post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});  


module.exports = router;