const tourModel = require('../../database/models/tour.model')
const handler = require('../handler')

class Tour {
    static addTour = async (req, res) => {
        try {
            const newTour = await tourModel(req.body)
            await newTour.save()
            handler.resHandler(res, 200, 'success', newTour, 'new tour add successful')
        } catch (e) {
            handler.resHandler(res, 200, 'success', JSON.parse(JSON.stringify(e)), 'new tour add successful')
        }
    }

    static editTour = async (req, res) => {
        try {
            const newTour = await tourModel.findByIdAndUpdate(req._id, req.body)
            handler.resHandler(res, 200, 'success', newTour, 'Tour updated')
        } catch (e) {
            handler.resHandler(res, 200, 'success', JSON.parse(JSON.stringify(e)), 'Tour not updated')
        }
    }

    static deleteOneTour = async (req, res) => {
        try {
            const newTour = await tourModel.findByIdAndRemove(req.params._id)
            handler.resHandler(res, 200, 'success', newTour, 'Tour deleted')
        } catch (e) {
            handler.resHandler(res, 200, 'success', JSON.parse(JSON.stringify(e)), 'Tour not deleted')
        }
    }

    static allTour = async (req, res) => {
        try {
            const newTour = await tourModel.find()
            handler.resHandler(res, 200, 'success', newTour, 'Tour')
        } catch (e) {
            handler.resHandler(res, 200, 'success', JSON.parse(JSON.stringify(e)), 'error with Tour')
        }
    }

    static delAllTour = async (req, res) => {
        try {
            const newTour = await tourModel.deleteMany()
            handler.resHandler(res, 200, 'success', newTour, 'Tour')
        } catch (e) {
            handler.resHandler(res, 200, 'success', JSON.parse(JSON.stringify(e)), 'error with Tour')
        }
    }

    static updatePimg = async (req, res) => {
        try {
            const ext = handler.fileHandler(req)
            req.user.image = `${process.env.APPUrl}${req.file.filename}.${ext}`
            await req.user.save()
            Helper.resHandler(res, 200, true, req.user, "done")
        }
        catch (e) {
            Helper.resHandler(res, 500, false, e.message, "Error featch data")
        }
    }
}

module.exports = Tour