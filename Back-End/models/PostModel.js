const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        description:{
            type: String,
            // required: true  
            default: ""          
        },
        images:{
            type: Array,
            default: []
        },
        video:{
            type: Object
        },
        comment:{
            type: Number,
            default: 0
        },
        felt:{
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model("PostModel", postSchema);