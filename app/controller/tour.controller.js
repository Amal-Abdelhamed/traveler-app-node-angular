const tourModel = require('../../database/models/tour.model')
const handler = require('../handler')

class Tour {
    static addTour = async (req, res) => {
        try {
            const newTour = await tourModel(req.body)
            await newTour.save()
            handler.resHandler(res, 200, 'success', newTour, 'new tour add successful')
        } catch (e) {
            handler.Errors(res, e.errors)
        }
    }

    static editTour = async (req, res) => {
        try {
            if (!req.body._id) {
                throw new Error("invalid data")
            } else {
                const newTour = await tourModel.findByIdAndUpdate(req.body._id, req.body)
                console.log(req.body._id);
                handler.resHandler(res, 200, 'success', newTour, 'Tour updated')
            }
        } catch (e) {
            handler.Errors(res, e.errors)
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
            handler.Errors(res, e.errors)
        }
    }

    static allTour = async (req, res) => {
        try {
            const newTour = await tourModel.find()
            handler.resHandler(res, 200, 'success', newTour, 'All Tour')
        } catch (e) {
            handler.Errors(res, e.errors)
        }
    }

    static delAllTour = async (req, res) => {
        try {
            const newTour = await tourModel.deleteMany()
            handler.resHandler(res, 200, 'success', newTour, 'Tour deleted successfull')
        } catch (e) {
            handler.Errors(res, e.errors)
        }
    }

    static updatePimg = async (req, res) => {
        try {
            const ext = handler.fileHandler(req)
            req.user = `${process.env.APPUrl}${req.file.filename}.${ext}`
            const tourImage = await tourModel.findByIdAndUpdate(req.headers._id, { "image": req.user })
            console.log(req.headers);
            // await tourImage.save()
            handler.resHandler(res, 200, true, req.file, "done")
        }
        catch (e) {
            console.log(e);
            handler.Errors(res, e.message)
        }
    }
}

module.exports = Tour