const mongoose = require("mongoose");

const postGroupSchema = new mongoose.Schema(
    {
        groupId: {
            type: String,
            required: true
        },
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
        comment:{
            type: Number,
            default: 0
        },
        felt:{
            type: Number,
            default: 0
        },
        typeText: {
            type: Boolean,
            default: true
        },
        reported:{
            type: Number,
            default: 0          
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model("PostGroupModel", postGroupSchema);