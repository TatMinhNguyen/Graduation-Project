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
            validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
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

function arrayLimit(val) {
    return val.length <= 5;
}

module.exports = mongoose.model("PostModel", postSchema);