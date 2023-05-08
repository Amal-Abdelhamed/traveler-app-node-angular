const Router = require('express').Router()
const tourController = require('../app/controller/tour.controller')
const upload = require("../app/middleWare/upload")

Router.post('/addTour', tourController.addTour)
Router.patch('/editTour', tourController.editTour)
Router.delete('/deleteTour', tourController.deleteOneTour)
Router.get('/allTour', tourController.allTour)
Router.delete('/delAllTour', tourController.delAllTour)
Router.patch("/updatePImg", upload.single("img"), tourController.updatePimg)

module.exports = Router