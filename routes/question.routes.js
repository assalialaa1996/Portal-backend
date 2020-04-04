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
router.post(""/*, authorize*/, (req, res) => {
    const newQuestion = new Question({
        user: req.body.id,
        content: req.body.content,
        name: req.body.name,
        tags: req.body.tags
    });
    
  newQuestion.save()
        .then(question => {
            res.json(question)
        })
        .catch(err => console.log("Unable to save question to databse", err));
})


//@type - DELETE
//@route -  /api/questions/:q_id
//@desc - route for deleting a specific question
//@access - PRIVATE
router.delete("/:q_id"/*, authorize*/, (req, res) => {
    Question.find({ _id: req.params.q_id })
        .then(question => {
            if (!question) {
                return res.json({ "NoQuestion": "Question Not found" });
            }
            
                Question.findOneAndRemove({ _id: req.params.q_id})
                .then(() => res.json({ Delete: "Deleted Successfully" }))
                .catch(err => console.log("Problem in removing Question", err));
            

            
        })
        .catch(err => console.log("Problem in Deleting a specific question", err));
});

//@type - DELETE
//@route -  /api/questions/all/del
//@desc - route for deleting all question of a user
//@access - PRIVATE
router.delete("/all/del", authorize , (req, res) => {
   
    Question.find({ user: req.body.id }).remove(() => {
        return res.json({ Deleted_all: "Succesfully deleted!" })
    })
});

//@type - GET
//@route -  /api/questions
//@desc - route for showing all question
//@access - PUBLIC
router.get("/", (req, res) => {
    Question.find()
        .sort({ date: "desc" })
        .then(questions => {
            if (!questions) {

            }
            res.json(questions)
        })
        .catch(err => consol.log("Problem in fetching question", err));
});


//@type - POST
//@route -  /api/questions/answers/:id
//@desc - route for submit answers to questions
//@access - PRIVATE
router.post("/answers/:id", authorize, (req, res) => {
    Question.findById(req.params.id)
        .then(question => {

            const newAnswer = {
                user: req.body.id,
                text: req.body.text,
                name: req.body.name,

            };

            question.answers.unshift(newAnswer);
            question.save()
                .then(question => {
                    res.json(question)
                })
                .catch(err => console.log("Error in saving question", err));
        })
        .catch(err => console.log("Problem in submitting answer", err));
})

//@type - POST
//@route -  /api/questions/upvote/:id
//@desc - route for upvoting
//@access - PRIVATE
router.post("/upvote/:id", authorize, (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            {
                if (!profile) {
                    return res.json({ ProfileNotFound: "You must have a profile to Upvote questions" })
                }
            }
            Question.findById(req.params.id)
                .then(question => {
                    if (!question) {
                        return res.json({ QuestionError: "Question not found!" })
                    }
                    else {
                        if (question.upvotes.filter(upvote => upvote.user.toString() ===
                            req.user.id.toString()).length > 0) {
                            const removethis = question.upvotes
                                .map(item => item.id)
                                .indexOf(req.params.id);

                            question.upvotes.splice(removethis, 1);
                            question.save()
                                .then(questiondownvote => {
                                    return res.json(questiondownvote);
                                })
                                .catch(err => console, log("Problem in saving after downvote", err));
                            // return res.status(400).json({ NoUpvotes: "Already upvoted to this question" });
                        }
                        else {
                            question.upvotes.unshift({ user: req.user.id });
                            question.save()
                                .then(question => {
                                    res.json(question)
                                })
                                .catch(err => console.log("Problem in saving upvote", err));
                        }

                    }
                })
                .catch(err => console.log("Problem in finding question", err));
        })
        .catch(err => console.log("Problem in upvote question", err));
});

//@type - POST
//@route -  /api/questions/answers/upvote/:qid/:aid
//@desc - route for upvoting answers
//@access - PRIVATE
router.post("/answers/upvote/:qid/:aid", authorize, (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                return res.json({ ProfileNotFound: "You must have a profile to love react answers" })
            }

            Question.findById(req.params.qid)
                .then(question => {
                    if (!question) {
                        return res.json({ QuestionError: "Question not found!" })
                    }
                    //console.log(question);
                    question.answers.map(item => {
                        if (item.id == req.params.aid) {
                            if (item.love.filter(upvote => upvote.user.toString() ===
                                req.user.id.toString()).length > 0) {
                                const removelove = item.love.map(itm => itm.user).indexOf(req.user.id);
                                item.love.splice(removelove, 1);
                            }
                            else {
                                item.love.unshift({ user: req.user.id });
                            }

                        }
                    });
                    question.save()
                        .then(question => res.json(question))
                        .catch(err => console.log("Problem in Saving love answer", err));

                })
                .catch(err => console.log("Problem in Fetching Question", err));

        })
        .catch(err => console.log("Problem in Fetching Profile", err));
});
module.exports = router;