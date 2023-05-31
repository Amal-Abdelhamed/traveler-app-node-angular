const router = require('express').Router()
const userController = require("../app/controller/user.controller")
const auth = require('../app/middleware/user.middleware')

router.get("/me", auth, userController.profile)
router.post("/register", userController.register)
router.post('/login', userController.login)
router.post('/logout', auth, userController.logout)
router.patch("/editInfo/:id",userController.updateAccount)
router.delete("/deletSingle/:id",auth,userController.deleteSingleUser)
module.exports = router