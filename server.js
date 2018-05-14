var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));


var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restfulTask");

var Schema = mongoose.Schema;

var SchemaTask = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


mongoose.model("Task", SchemaTask);


var Task = mongoose.model("Task");


mongoose.Promise = global.Promise;

//--------------------------------------------------------------

app.get('/', function(req,res){
    Task.find({}, function(err, data){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log(data);
            res.json({
                message: "Success",
                data: data
            });
        };
    });
});

app.get('/:id', function(req, res){
    console.log(req.params.id);
    Task.findOne({
        _id: req.params.id
    },
    function(err, data){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log(data);
            res.json({
                message: "Success",
                data: data
            });
        };
    });
});

app.post('/tasks', function(req, res){
    console.log("POST DATA: " + req.body);
    var task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    });
    task.save(function (err, data){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log("Task creation, successful");
            res.json({
                message: "Success",
                data: data
            });
        };
    });
});

app.put('tasks/:id', function(req, res){
    console.log(req.params.id);
    Task.update({
        _id: req.params.id
    }, {
        title: req.params.title,
        description: req.params.description,
        completed: req.params.completed
    }, function(err, data){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log("Your update was successful");
            res.json({
                message: "Success",
                data: data
            });
        };
    });
});

app.delete('/tasks/:id', function(req, res){
    console.log(req.params.id);
    Task.remove({
        _id: req.params.id
    }, function(err){
        if(err){
            console.log(err);
            res.json({
                message: "Error",
                error: error
            });
        } else {
            console.log("Successfully removed this task");
            res.json({
                message: "Success",
            });
        };
    });
});

app.listen(8000, function(){
    console.log("listening on port 8000");
})