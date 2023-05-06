const express = require("express")
const app = express()
require("../database/connection")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require('../routes/user.routes')
app.use('/api/user', userRouter)

app.all('*', (req, res) => {
    res.status(404).send({ status: false, data: null, message: 'invalid url' })
})

const adminRouter=require('../routes/admin.routes')
app.use('/api/admin',adminRouter)

module.exports = app

