const tourModel = require('../../database/models/tour.model')
const { resHandler } = require('../handler')

class Tour {
    static addTour = async (req, res) => {
        try {
            const newTour = await tourModel(req.body)
            await newTour.save()
            resHandler(res, 200, 'success', newTour, 'new tour add successful')
        } catch (e) {
            resHandler(res, 200, 'success', JSON.parse(JSON.stringify(e)), 'new tour add successful')
        }
    }
}

module.exports = Tour