const router=require("express").Router()
const userControllerAdmin=require("../app/controller/user.controller")
const authAdmin = require('../app/middleware/admin.middleware')


router.delete("/deleteAllUsers",authAdmin,userControllerAdmin.delAllUsers)
router.get("/showAllUser",authAdmin,userControllerAdmin.showAllUsers)
router.get("/showUser/:id",authAdmin,userControllerAdmin.showUser)
router.post("/logoutAll",authAdmin,userControllerAdmin.logoutAllUsers)
router.get("/showAllAdmin",authAdmin,userControllerAdmin.showAllAdmins)
module.exports=router