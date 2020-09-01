var express = require("express")
var router = express.Router();
var mongojs = require("mongojs")
var db = mongojs(
    "meantask",
    ["tasks"]
)

// Get All Tasks //
router.get("/tasks", function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err)
        }
        res.json(tasks)
    })
})

// Save Tasks //
router.post("/task", function(req, res, next){
    var task = req.body
    console.log(task)
    if(!task.title){
        res.status(400)
        res.json({
            error:"Bad Data"
        })
    }else{
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err)
            }
            res.json(task)
        })
    }
})

module.exports = router;