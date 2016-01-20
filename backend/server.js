var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var restify = require("express-restify-mongoose");
var config = require("../config");
var routes = require("./router");
var log4js = require("log4js");
log4js.configure("./backend/log4js.json", {});
var logger = log4js.getLogger("server");

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
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    shared: { type: Boolean, required: false, default: false },
    milestone: { type: Boolean, required: false, default: false }
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
    /*middleware: null,*/
    onError: function (err, req, res, next) {
        //console.log(err, err.status);
        //next("error");
        res.status(err.status).send().end();
    }
});

router.use(routes.middleware());

restify.serve(router, TaskModel);
restify.serve(router, ProjectModel);
app.use(router);

app.listen(config.app.port, function() {
    logger.info("Express server listening on port: ", config.app.port);
});
