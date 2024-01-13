const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Post.find({});

    res.status(200).json(blogs);

  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET a specific blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Post.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;