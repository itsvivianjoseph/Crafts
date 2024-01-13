const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({});

        console.log(todos)
        if (!todos) {
            return res.status(404).json({ error: "no todos found" });
        }

        res.status(200).json(todos);
    } catch (error) {
        console.log("some error occurred...");
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const todoItem = await Todo.findById(req.params.id);

        if (!todoItem) {
            return res.status(404).json({ error: "no todo found with the given id" });
        }

        res.status(200).json(todoItem);
    } catch (error) {
        console.log("some error occurred...");
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;