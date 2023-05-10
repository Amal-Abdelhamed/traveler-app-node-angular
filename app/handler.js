const fs = require('fs')

class Handler {
    static resHandler = (res, statusCode, apiStatus, data, message) => {
        res.status(statusCode).send({ apiStatus, data, message })
    }

    static Errors = (res, e) => {
        const Errors = {
            status: 404,
            data: false,
            message: 'invalid data',
            errors: e
        }
        res.send(JSON.parse(JSON.stringify(Errors)))
    }

    static fileHandler = (req) => {
        const ext = req.file.originalname.split(".").pop()
        const newName = req.file.path + "." + ext
        fs.renameSync(req.file.path, newName)
        return ext
    }
}
module.exports = Handler