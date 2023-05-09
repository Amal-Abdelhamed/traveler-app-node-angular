const router = require("express").Router()
const destController = require("../app/controller/destination.controller")
const upload = require("../app/middleware/upload.middleware")

router.post("/add", destController.add)
router.post("/destination/uploadpic", upload.single('photos'), destController.uploadPic)

router.get("/all", destController.all)
router.get("/single/:id", destController.single)

router.patch("/update/:id", destController.update)

router.delete("/deleteone/:id", destController.deleteOne)
router.delete("/delete", destController.deleteAll)

module.exports = router