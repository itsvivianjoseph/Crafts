const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            dueDate,
            priority,
            completed
        } = req.body;

        const newTodo = new Todo({
            title,
            description,
            dueDate,
            priority,
            completed
        });

        const savedTodo = await newTodo.save();

        res.status(200).json(savedTodo);
    } catch (error) {
        console.log("Some error occurred...");
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
