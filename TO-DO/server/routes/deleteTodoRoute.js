const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

router.delete("/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ error: "No todo found with the given id" });
        }

        res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
    } catch (error) {
        console.error("Some error occurred...");
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;