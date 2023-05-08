const express = require("express")
const app = express()
const destinationRoutes = require ("../routes/destination.routes")
require("../database/connection")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/destination",destinationRoutes)


const userRouter = require('../routes/user.routes')
app.use('/api/user', userRouter)

app.all('*', (req, res) => {
    res.status(404).send({ status: false, data: null, message: 'invalid url' })
})

const adminRouter=require('../routes/admin.routes')
app.use('/api/admin',adminRouter)

module.exports = app

