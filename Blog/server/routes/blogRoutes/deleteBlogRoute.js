const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

// Delete a specific post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(204).json(); 
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;