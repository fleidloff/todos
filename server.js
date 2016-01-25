var http = require("http");
var config = require("./config");
var log4js = require("log4js");
log4js.configure("./log4js.json", {});
var logger = log4js.getLogger(".");
var app = require("./froodle/dist/server");
var reveal = require("./reveal/server");

reveal(app);
http.createServer(app);
var server = http.createServer(app);

server.listen(config.app.port, function() {
    logger.info("server running and listening on port " + config.app.port);
});
