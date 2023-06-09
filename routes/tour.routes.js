const Router = require('express').Router()
const tourController = require('../app/controller/tour.controller')
const upload = require("../app/middleware/upload.middleware")
//const auth = require("../app/middleware/auth.middleware")
const authAdmin = require("../app/middleware/admin.middleware")

Router.post('/addTour',authAdmin, tourController.addTour)
Router.patch('/editTour/:id',authAdmin, tourController.editTour)

Router.delete('/delOneTour/:_id', authAdmin, tourController.deleteOneTour)
Router.get('/allTour', tourController.allTour)
Router.delete('/delAllTour', authAdmin, tourController.delAllTour)
Router.patch("/updatePImg", authAdmin, upload.single("image"), tourController.updatePimg)
Router.get('/getSingleTour/:id', tourController.showSingleTour)
Router.get('/desTours', authAdmin,tourController.desTours)
module.exports = Router