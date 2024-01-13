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
    try {
      const logEntry = `${new Date().toISOString()} - ${req.url} - ${req.method}\n`;
      logStream.write(logEntry);
      next();
    } catch (error) {
      // Log the error and pass it to the next middleware
      console.error('Error in logging middleware:', error);
  
      // Append the error to the log file
      const errorLogEntry = `${new Date().toISOString()} - ERROR: ${error.message}\n`;
      logStream.write(errorLogEntry);
  
      next(error);
    }
});
  
connection()

// import routes
const createBlogRoute = require("./routes/blogRoutes/createBlogRoute.js")
const readBlogRoute = require("./routes/blogRoutes/readBlogRoute.js")
const updateBlogRotue = require("./routes/blogRoutes/updateBlogRotue.js")
const deleteBlogRoute = require("./routes/blogRoutes/deleteBlogRoute.js")
const createUserRoute = require("./routes/userRoutes/createUserRoute.js")
const allUserRoute = require("./routes/userRoutes/allUserRoute.js")
const updateUserRoute = require("./routes/userRoutes/updateUserRoute.js")
const deleteUserRoute = require("./routes/userRoutes/deleteUserRoute.js")

// define API routes
app.use("/api/create/blog", createBlogRoute)
app.use("/api/read/blog", readBlogRoute)
app.use("/api/update/blog", updateBlogRotue)
app.use("/api/delete/blog", deleteBlogRoute)

app.use("/api/create/user", createUserRoute)
app.use("/api/all/user", allUserRoute)
app.use("/api/update/user", updateUserRoute)
app.use("/api/delete/user", deleteUserRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`you're listening on port ${PORT}`)
})