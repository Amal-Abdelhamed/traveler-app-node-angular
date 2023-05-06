const mongoose = require('mongoose')
const tourSchema = mongoose.Schema({
    rate: {
        type: String,
        required: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    days: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        min: 10,
    },
    country: {
        type: String,
        required: true
    }
})

const tourModel = mongoose.model('tour', tourSchema)
module.exports = tourModel