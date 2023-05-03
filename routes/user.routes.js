const router = require('express').Router()
const userController = require("../app/controller/user.controller")
const auth = require('../app/middleware/user.middleware')
const authAdmin = require('../app/middleware/admin.middleware')

router.post("/register", userController.register)
router.post('/login', userController.login)
router.post('/logout', auth, userController.logout)


module.exports = router