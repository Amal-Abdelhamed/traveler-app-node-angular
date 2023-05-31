const mongoose = require("mongoose")
const destinationSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    overview: [
        {
            country: {
                type: String,

                required: true,
            },
            visareq: {
                type: String,
                trim: true,
                required: true,
            },
            language: {
                type: [String],
                trim: true,
                required: true,
            },
            currency: {
                type: String,
                trim: true,
                required: true,
            },
            Area: {
                type: String,
                trim: true,
                required: true,
            }
        }
    ],
    cover: {
        type: String,
        trim: true,
    },
    continent: {
        type: String,
        required: true,
    },
    info: [
        {
            "max-guests": {
                type: Number,
            },
            "min-age": {
                type: Number,
            },
            location: {
                type: String,
            },
        },
    ],




}, { timestamps: true })

destinationSchema.virtual("desTours", {
    ref: "moreTour",
    localField: "_id",
    foreignField: "idDetination"
})

destinationSchema.methods.generateToken = function () {
    const payload = {
        destinationId: this._id,
    };
    const token = jwt.sign(payload, "mysecretkey", { expiresIn: "1h" });
    return token;
};

const destinationModel = mongoose.model("destination", destinationSchema)
module.exports = destinationModel