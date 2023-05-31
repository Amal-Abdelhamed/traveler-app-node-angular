const mongoose = require('mongoose')
const tourSchema = mongoose.Schema({
  idDetination:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
        ref:"destination"
  },
    rate: {
        type: String,
        required: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
      },
    price: {
        type: Number,
        required: true,
    },
    overview: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
      },
    image: {
       data: Buffer,
    contentType: String
    },
     include: {
        type: [String],
        required: true,
      },
      exclude: {
        type: [String],
        required: true,
      },
      amenities: {
        type: [String],
        required: true,
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
    },
    plan: [
        {
          day: {
            type: String,
            required: true,
          },
          details: {
            type: String,
            required: true,
          },
        },
      ],
      
},{timestamps:true})

const tourModel = mongoose.model('moreTour', tourSchema)
module.exports = tourModel