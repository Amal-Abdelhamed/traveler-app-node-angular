const router = require("express").Router()
const destController = require("../app/controller/destination.controller")
const upload = require("../app/middleware/upload.middleware")
const authAdmin=require('../app/middleware/admin.middleware')

router.post("/add", authAdmin,destController.add)
router.post("/destination/uploadpic", upload.single('photos'), destController.uploadPic)

router.get("/all", destController.all)
router.get("/single/:id", destController.single)

router.patch("/update/:id", authAdmin,destController.update)

router.delete("/deleteone/:id",authAdmin, destController.deleteOne)
router.delete("/delete",authAdmin, destController.deleteAll)

module.exports = router