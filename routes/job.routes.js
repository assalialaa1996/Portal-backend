const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/auth");
const http = require('http');
//load User model
const Person = require("../models/User");
//load Profile  model
const Profile = require("../models/profile");
//load Question model
const Job = require("../models/Job");

//@type - POST
//@route -  /api/jobs
//@desc - route for submit job
//@access - PRIVATE
router.post(""/*, authorize*/, (req, res) => {
    const newJob = new Job({
        user: req.body.user,
        content: req.body.content,
        experience: req.body.experience,
        level: req.body.level,
        responsabilities: req.body.responsabilities,
        requirements: req.body.requirements,
        date: Date.now(),
        closed: false
    });
  
  newJob.save()
        .then(job => {
            res.json(job)
        })
        .catch(err => console.log("Unable to save job to database", err));
})
//get by ID
router.get("/one/:id", (req, res) => {
 

  Job.find({ _id: req.params.id })
  .then(job => {
      if (!job) {
          return res.json({ "NoJob": "Job Not found" });
      }
      
          res.send(job);
  })
});

//get  my projects
router.get("/my/:id", (req, res) => {
 

  Job.find({ user: req.params.id })
  .then(q => {
      if (!q) {
          return res.json({ "NoJob": "Jobs Not found" });
      }
      
          res.send(q);
  })
});
  
 



//@type - DELETE
//@route -  /api/jobs/:j_id
//@desc - route for deleting a specific job
//@access - PRIVATE
router.delete("/:j_id"/*, authorize*/, (req, res) => {
    Job.find({ _id: req.params.j_id })
        .then(job => {
            if (!job) {
                return res.json({ "NoJob": "Job Not found" });
            }
            
                Job.findOneAndRemove({ _id: req.params.j_id})
                .then(() => res.json({ Delete: "Deleted Successfully" }))
                .catch(err => console.log("Problem in removing Question", err));
            

            
        })
        .catch(err => console.log("Problem in Deleting a specific job", err));
});
//@type - GET
//@route -  /api/job
//@desc - route for showing all jobs
//@access - PUBLIC
router.get("/", async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 6 } = req.query;
  
    try {
      // execute query with page and limit values
      const jobs = await Job.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort( {date: 'desc'})
        .exec();
  
      // get total documents in the Posts collection 
      const count = await Job.countDocuments();
  
      // return response with posts, total pages, and current page
      res.json({
          jobs,
          totalPages: Math.ceil(count / limit),
          currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
  });
  

module.exports = router;