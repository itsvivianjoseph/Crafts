const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");

// Update a specific user by ID
router.put("/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the new password before updating it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        password: hashedPassword,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Partially update a specific user by ID
router.patch("/:id", async (req, res) => {
    try {
      // Check if the request body contains any fields to update
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }
  
      // Hash the new password before updating it in the database
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error patching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});  

module.exports = router;