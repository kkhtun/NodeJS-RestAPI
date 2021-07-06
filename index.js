require("dotenv").config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Connect to MongoDB with Mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
db = mongoose.connection

// Check Connection
db.on('error', (err) => {
    console.error('Connection Error: ', err)
})
db.once('open', ()=> {
    console.log("Database Connected at ", process.env.DATABASE_URL)
})

// Set Up Server to use JSON in body
app.use(express.json())

// Setup Routes
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter)

// Start Server Application with default port 5000
const port = process.env.PORT || 5000
app.listen(port, ()=> console.log("Server started at", port))