var http = require("http");
var config = require("./config");
var log4js = require("log4js");
log4js.configure("./log4js.json", {});
var logger = log4js.getLogger(".");
var froodleApp = require("./froodle/dist/server");
var express = require("express");
var revealApp = require("./reveal/server");


var app = express();
app
    .use("/froodle/", froodleApp)
    .use("/reveal/", revealApp)
    .listen(config.app.port, function() {
        logger.info("server running and listening on port " + config.app.port);
    });