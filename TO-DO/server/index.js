require('dotenv').config();
const express = require("express")
const connection = require("./DB.js")
const fs = require("fs")

const app = express()

app.use(express.json());

// logging reqs
const logStream = fs.createWriteStream("logFile.txt", {
    flags: "a"
});

app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.url} - ${req.method}\n`;
    logStream.write(logEntry);
    next();
});

// import routes
const createTodoRoute = require("./routes/createTodoRoute.js")
const readTodoRoute = require("./routes/readTodoRoute.js")
const updateTodoRotue = require("./routes/updateTodoRotue.js")
const deleteTodoRoute = require("./routes/deleteTodoRoute.js")

// define API routes
app.use("/api/create/todo", createTodoRoute)
app.use("/api/read/todo", readTodoRoute)
app.use("/api/update/todo", updateTodoRotue)
app.use("/api/delete/todo", deleteTodoRoute)

// database connection
connection()

// setting the server to listen
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`your listening on port ${PORT}`)
})