const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ error: "No todos were found!!!" });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.log("Some error occurred...");
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "No todo found with the given id" });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.log("Some error occurred...");
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;