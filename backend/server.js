var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var restify = require("express-restify-mongoose");
var port = 8080;
var config = require("../config");

mongoose.connect(config.mongo.host + config.mongo.db, {server:{auto_reconnect:true}});
 
var Task = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false},
    sort: { type: Number, required: true}
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
})
restify.serve(router, TaskModel);
app.use(router);
 
app.listen(config.app.port, function() {
    console.log("Express server listening on port: ", config.app.port);
});