const express = require("express")
const app = express()
const destinationRoutes = require ("../routes/destination.routes")
require("../database/connection")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/destination",destinationRoutes)

module.exports = app

