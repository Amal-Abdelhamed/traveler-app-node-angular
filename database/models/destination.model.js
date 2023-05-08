const mongoose= require ("mongoose")
const destinationSchema = mongoose.Schema({
    name:{
        type : String,
        trim : true,
        required: true,
    },
    description:{
        type : String,
       trim : true,
        required : true,
    },
    overview:[
        {country:{
            type : String,
           
           //required: true,
        },
        visareq:{
            type : String,
            trim : true,
           required: true,
        },
        language:{
            type : String,
            trim : true,
           required: true,
        },
        currency:{
            type : String,
            trim : true,
           // required: true,
        },
        Area:{
            type : String,
            trim : true,
            required: true,
        }}
    ],
    img :{
        type : String,
        trim : true,
    },

})
const destinationModel=mongoose.model("destination",destinationSchema)
module.exports = destinationModel