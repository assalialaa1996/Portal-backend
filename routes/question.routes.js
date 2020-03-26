const express = require("express");
const router = express.Router();

const authorize = require("../middlewares/auth");

//load User model
const Person = require("../models/User");
//load Profile  model
const Profile = require("../models/profile");
//load Question model
const Question = require("../models/Question");

//@type - POST
//@route -  /api/questions
//@desc - route for submit question
//@access - PRIVATE
router.post("", /*authorize,*/ (req, res) => {
    const newQuestion = new Question({
        user: req.user.id,
        textone: req.body.textone,
        texttwo: req.body.texttwo,
        name: req.user.name
    });
    newQuestion.save()
        .then(question => {
            res.json(question)
        })
        .catch(err => console.log("Enable to save question to databse", err));
})

module.exports = router;