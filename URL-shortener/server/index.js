require('dotenv').config();
const express = require("express")
const connection = require("./DB.js")
const fs = require("fs")
const CronDelete = require('./cron-jobs/CronDelete.js');

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

global.counter = 1

// import routes
const createUrlRoute = require("./routes/Url/createUrlRoute.js")
const readUrlRoute = require("./routes/Url/readUrlRoute.js")
const updateUrlRoute = require("./routes/Url/updateUrlRoute.js")
const deleteUrlRoute = require("./routes/Url/deleteUrlRoute.js")
const redirectToOriginalUrl = require("./routes/Url/redirectToOriginalUrl.js")

const addAnalyticsData = require("./routes/Analytics/addAnalyticsData.js")
const readForSpecificUrl = require("./routes/Analytics/readForSpecificUrl.js")
const overallAnalytics = require("./routes/Analytics/overallAnalytics.js")

// define API routes
app.use("/api/create/url", createUrlRoute)
app.use("/api/read/url", readUrlRoute)
app.use("/api/update/url", updateUrlRoute)
app.use("/api/delete/url", deleteUrlRoute)
app.use("/api/redirect/url", redirectToOriginalUrl)

app.use("/api/analytics", addAnalyticsData)
app.use("/api/analytics", readForSpecificUrl)
app.use("/api/analytics", overallAnalytics)

// database connection
connection()

// setting the server to listen
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`your listening on port ${PORT}`)
})