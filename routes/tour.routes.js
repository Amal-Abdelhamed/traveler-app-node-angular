const tourController = require('../app/controller/tour.controller')
const Router = require('express').Router()

Router.post('addTour', tourController.addTour)