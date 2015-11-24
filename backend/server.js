var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var restify = require("express-restify-mongoose");
var config = require("../config");

mongoose.connect(config.mongo.host + config.mongo.db, config.mongo.config);

var Project = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false }
});
var ProjectModel = mongoose.model("Project", Project); 

var Task = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false},
    sort: { type: Number, required: true},
    checked: { type: Boolean, required: true, default: false },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }
});
var TaskModel = mongoose.model("Task", Task);
 
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(config.app.context, express.static(config.frontend.path));
 
var router = express.Router();
restify.defaults({
    prefix: config.app.context + config.api.context,
    version: "/" + config.api.version,
    middleware: function (req, res, next) {
        //console.log('Incoming %s request', req.method);
        next();
    },
    onError: function (err, req, res, next) {
        next("mongo error");
    }
})
restify.serve(router, TaskModel);
restify.serve(router, ProjectModel);
app.use(router);
 
app.listen(config.app.port, function() {
    console.log("Express server listening on port: ", config.app.port);
});
