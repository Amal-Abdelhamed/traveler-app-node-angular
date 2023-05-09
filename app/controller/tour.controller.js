const tourModel = require('../../database/models/tour.model')
const handler = require('../handler')

class Tour {
    static addTour = async (req, res) => {
        try {
            const newTour = await tourModel(req.body)
            await newTour.save()
            handler.resHandler(res, 200, 'success', newTour, 'new tour add successful')
        } catch (e) {
            handler.resHandler(res, 404, 'false', JSON.parse(JSON.stringify(e)), 'new tour add successful')
        }
    }

    static editTour = async (req, res) => {
        try {
            const newTour = await tourModel.findByIdAndUpdate(req._id, req.body)
            handler.resHandler(res, 200, 'success', newTour, 'Tour updated')
        } catch (e) {
            handler.resHandler(res, 400, 'false', JSON.parse(JSON.stringify(e)), 'Tour not updated')
        }
    }

    static deleteOneTour = async (req, res) => {
        try {
            const delTour = await tourModel.findByIdAndRemove(req.params)
            if (delTour == null) {
                throw new Error('invalid id')
            }
            handler.resHandler(res, 200, 'success', delTour, 'Tour deleted')
        } catch (e) {
            handler.resHandler(res, 404, 'false', JSON.parse(JSON.stringify(e)), 'Tour not deleted')
        }
    }

    static allTour = async (req, res) => {
        try {
            const newTour = await tourModel.find()
            handler.resHandler(res, 200, 'success', newTour, 'Tour')
        } catch (e) {
            handler.resHandler(res, 404, 'false', JSON.parse(JSON.stringify(e)), 'error with Tour')
        }
    }

    static delAllTour = async (req, res) => {
        try {
            const newTour = await tourModel.deleteMany()
            handler.resHandler(res, 200, 'success', newTour, 'Tour')
        } catch (e) {
            handler.resHandler(res, 400, 'false', JSON.parse(JSON.stringify(e)), 'error with Tour')
        }
    }

    static updatePimg = async (req, res) => {
        try {
            const ext = handler.fileHandler(req)
            req.user = `${process.env.APPUrl}${req.file.filename}.${ext}`
            const tourImage = await tourModel.findByIdAndUpdate(req.params.id, { "image": req.user })
            await tourImage.save()
            handler.resHandler(res, 200, true, tourImage, "done")
        }
        catch (e) {
            handler.resHandler(res, 500, false, e.message, "Error featch data")
        }
    }
}

module.exports = Tour