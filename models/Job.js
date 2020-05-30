const mongoose = require("mongoose")
const schema = mongoose.Schema;

const JobSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        title:{
            type: String
        },
        description: {
            type: String
        },
        body:{
            type: String
        }
    },
    experience: {
        type: String,

    },
    level: {
        type: String,

    },
    responsabilities: {
        type: String
    },
    requirements: {
        type: String
    }   ,
    date: {
        type: Date,
        Default: Date.now,

    },
    closed:{
        type: Boolean,
        Default: false
    }

});
module.exports = Job = mongoose.model("Job", JobSchema);