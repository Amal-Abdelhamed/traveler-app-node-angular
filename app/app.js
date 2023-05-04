const express = require("express")
const app = express()
require("../database/connection")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter=require('../routes/user.routes')
app.use('/api/user',userRouter)

const adminRouter=require('../routes/admin.routes')
app.use('/api/admin',adminRouter)

module.exports = app

