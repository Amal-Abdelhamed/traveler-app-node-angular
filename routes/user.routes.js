const router = require('express').Router()
const userController = require("../app/controller/user.controller")
const auth = require('../app/middleware/middleware')

router.post("/register", userController.register)
router.post('/login', auth, userController.login)
router.post('/logout', auth, userController.logout)


module.exports = router