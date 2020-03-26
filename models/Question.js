const mongoose = require("mongoose")
const schema = mongoose.Schema;

const QuestionSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        title:{
            type: String
        },
        body: {
            type: String
        }
    },
    name: {
        type: String,

    },
    tags: [{
        type: String
    }],
    upvotes: [{
        user: {
            type: schema.Types.ObjectId,
            ref: "User"
        }

    }],
    answers: [{
        user: {
            type: schema.Types.ObjectId,
            ref: "User"
        },
        text: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },
        Date: {
            type: Date,
            Default: Date.now

        },
        love: [{
            user: {
                type: schema.Types.ObjectId,
                ref: "User"
            }

        }],
        working: {
            type: Boolean,
            Default :false
        }


    }],
    date: {
        type: Date,
        Default: Date.now,

    },
    answered: {
        type: Boolean,
        Default: false
    },
    cloded:{
        type: Boolean,
        Default: false
    }

});
module.exports = Question = mongoose.model("myQuestion", QuestionSchema);