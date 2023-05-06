const express = require("express")
const app = express()
const destinationRoutes = require ("../routes/destination.routes")
require("../database/connection")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/destination",destinationRoutes)
app.all("*",async(req,res)=>{
    res.status(404).send({data:"invalid url"})
})
module.exports = app

