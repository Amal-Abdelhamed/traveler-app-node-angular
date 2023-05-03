const userModel = require("../../database/models/user.model")
const { verify } = require("jsonwebtoken")
const handler = require('../handler')



const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("bearer ", "")
        const decodedToken = verify(token, process.env.JWT)
        const userData = await userModel.findOne({
            _id: decodedToken._id,
            "tokens.token": token
        })
        if (!userData) throw new Error("not authorized")
        req.user = userData
        req.token = token

        next()

    }
    catch (e) {
        handler.resHandler(res, 500, false, e.message, "user not authorized")

    }
}

module.exports = auth