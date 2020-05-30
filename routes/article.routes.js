const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");
const http = require('http');
//load User model
const Person = require("../models/User");
//load Profile  model
const Profile = require("../models/profile");
//load Question model
const Article = require("../models/Article");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })

router.post('/file', upload.single('UploadFiles'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })


//@type - POST
//@route -  /api/jobs
//@desc - route for submit job
//@access - PRIVATE
router.post(""/*, authorize*/, (req, res) => {
    const newArt = new Article({
        user: req.body.user,
        content: req.body.content,
        title_image: req.body.title_image,
        date: Date.now()
    });
  newArt.save()
        .then(article => {
            res.json(article)
        })
        .catch(err => console.log("Unable to save article to database", err));
})
//@type - DELETE
//@route -  /api/article/:ar_id
//@desc - route for deleting a specific job
//@access - PRIVATE
router.delete("/:ar_id"/*, authorize*/, (req, res) => {
    Article.find({ _id: req.params.ar_id })
        .then(art => {
            if (!art) {
                return res.json({ "NoArticle": "Article Not found" });
            }
            
                Article.findOneAndRemove({ _id: req.params.ar_id})
                .then(() => res.json({ Delete: "Deleted Successfully" }))
                .catch(err => console.log("Problem in removing Article", err));
            

            
        })
        .catch(err => console.log("Problem in Deleting a specific article", err));
});

module.exports = router;