const tourModel = require('../../database/models/tour.model')
const destinationModel = require('../../database/models/destination.model')
const handler = require('../handler')

class Tour {
    static addTour = async (req, res) => {
        try {
            // in the frontend i will add with the Tour the _id of the specific destination
            // in the body i will add the _id of the destination 
            const newTour = new tourModel(req.body)
            await newTour.save()
            handler.resHandler(res, 200, 'success', newTour, 'new tour add successful')
        } catch (e) {
            handler.resHandler(res, 500, false, e.message, "failed to add  tour")
        }
    }
    static desTours = async (req, res) => {
        try {
            const destination = await destinationModel.findOne({ _id: req.params.id }).populate("desTours")
            console.log(destination);
            handler.resHandler(res, 200, 'success', { destination, desTours: destination.desTours }, 'desTours success')
        }
        catch (e) {
            handler.resHandler(res, 500, false, e.message, "failed to show tour")
        }
    }

    static editTour = async (req, res) => {
        try {
            const tour = await tourModel.findByIdAndUpdate(req.params.id, req.body)

            await tour.save()
            handler.resHandler(res, 200, true, tour, "tour edited successfully")
        }
        catch (e) {
            handler.resHandler(res, 500, false, e.message, "failed to edit  tour")
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
            handler.resHandler(res, 500, false, e.message, "failed to delete  tour")
        }
    }

    static allTour = async (req, res) => {
        try {
            const newTour = await tourModel.find()
            const tourNum = newTour.length
            handler.resHandler(res, 200, 'success', { tourNum, newTour }, 'All Tour')
        } catch (e) {
            handler.resHandler(res, 500, false, e.message, "failed to show all tour")
        }
    }

    static delAllTour = async (req, res) => {
        try {
            const newTour = await tourModel.deleteMany()
            handler.resHandler(res, 200, 'success', newTour, 'Tour deleted successfull')
        } catch (e) {
            handler.resHandler(res, 500, false, e.message, "failed delete all  tour")
        }
    }

    static showSingleTour = async (req, res) => {
        try {
            const tour = await tourModel.findById(req.params.id);
            handler.resHandler(res, 200, true, tour, "tour")

        } catch (e) { handler.resHandler(res, 500, false, e.message, "Error can't get data ") }
    };


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
            handler.resHandler(res, 500, false, e.message, "failed to add  pic")
        }
    }


}

module.exports = Tour