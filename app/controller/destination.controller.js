const destinationModel = require("../../database/models/destination.model")
const tourModule = require('../../database/models/tour.model')
const Handler = require("../handler")
const fs = require("fs")

class Destination {
    static add = async (req, res) => {
        try {
            const destData = new destinationModel(req.body)
            await destData.save()
            Handler.resHandler(res, 200, true, { destData, newtour }, "added successfully")

        }
        catch (e) {
            Handler.resHandler(res, 500, false, e.message, "add failed")
        }
    }
    static all = async (req, res) => {
        try {
            const allDest = await destinationModel.find()
            Handler.resHandler(res, 200, true, allDest, "all destinations showed ")

        }
        catch (e) {
            Handler.resHandler(res, 500, false, e.message, "failed showing all destinations")
        }

    }
    static single = async (req, res) => {
        try {
            const destData = await destinationModel.findById(req.params.id)
            Handler.resHandler(res, 200, true, destData, " destination showed ")

        }
        catch (e) {
            Handler.resHandler(res, 500, false, e.message, "failed showing destination")
        }

    }
    static update = async (req, res) => {
        try {
            const destData = await destinationModel.findByIdAndUpdate(req.params.id, req.body)
            await destData.save()
            Handler.resHandler(res, 200, true, destData, " data added ")

        }
        catch (e) {
            Handler.resHandler(res, 500, false, e.message, "failed showing destination")
        }

    }
    static deleteOne = async (req, res) => {
        try {
            const destData = await destinationModel.findByIdAndDelete(req.params.id)
            Handler.resHandler(res, 200, true, destData, " destination deleted ")

        }
        catch (e) {
            Handler.resHandler(res, 500, false, e.message, "failed deleting destination")
        }

    }
    static deleteAll = async (req, res) => {
        try {
            const destData = await destinationModel.deleteMany()
            Handler.resHandler(res, 200, true, destData, " all destionations deleted ")

        }
        catch (e) {
            Handler.resHandler(res, 500, false, e.message, "failed deleting destinations")
        }

    }
    static uploadPic = async (req, res) => {
        try {
            const ext = req.file.originalname.split(".").pop()
            const newName = req.file.path + "." + ext
            fs.renameSync(req.file.path, newName)
            req.destination.images = newName
            req.destination.save()
            Handler.resHandler(res, 200, true, req.destination, "done")
        }
        catch (e) {
            Handler.resHandler(res, 500, false, e.message, "error uploading file")
        }
    }
}

module.exports = Destination