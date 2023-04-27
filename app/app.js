const express = require("express")
const app = express()
require("../database/connection")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

module.exports = app

