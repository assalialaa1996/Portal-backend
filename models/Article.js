const mongoose = require("mongoose")
const schema = mongoose.Schema;

const ArticleSchema = new schema({
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
        body: {
            type: String
        }
    },
    date: {
        type: Date,
        Default: Date.now,

    },
    comments: [{
        text:{
            type: String
        },
        name:{
            type: String
        },
        user: {
            type: schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: Date,
            Default: Date.now,
        }
    }]
    

});
module.exports = Article = mongoose.model("Article", ArticleSchema);