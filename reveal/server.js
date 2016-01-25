var express = require("express");
var path = require("path");
var Mustache = require("mustache");
var fs = require("fs");
var md = require("reveal.js/plugin/markdown/markdown");
var config = require("../config");
var http = require("http");

var base = "/reveal";
var staticDir = express.static;
var serverBasePath = path.join(__dirname);

var opts = {
    revealBasePath: path.resolve(require.resolve("reveal.js"), "..", ".."),
    template: fs.readFileSync(path.join(serverBasePath, "template", "reveal.html")).toString(),
    theme: "black",
    highlightTheme: "zenburn",
    separator: "\n\n\n",
    verticalSeparator: "^(\r\n?|\n)----(\r\n?|\n)$",
    revealOptions: {}
};

var printPluginPath = path.join(serverBasePath, "node_modules", "reveal.js", "plugin", "print-pdf", "print-pdf.js");

var startMarkdownServer = function(options) {
    var initialMarkdownPath = options.initialMarkdownPath;
    var sourceFile;
    var app = options.app;

    opts.userBasePath = options.basePath;
    opts.theme = options.theme || opts.theme;
    opts.separator = options.separator || opts.separator;
    opts.verticalSeparator = options.verticalSeparator || opts.verticalSeparator;
    opts.revealOptions = options.revealOptions || {};

    app.use("/lib/css/" + opts.highlightTheme + ".css",
        staticDir(path.join(serverBasePath, "node_modules", "highlight.js", "styles", opts.highlightTheme + ".css")));
    app.get("/:id", renderMarkdownAsSlides);
};

var renderMarkdownAsSlides = function(req, res) {
    // fleidlof.alnilam.uberspace.de/nodejs/froodle/api/v1/Tasks/56a4c233a57e84e14b555fed.md?shared=true
    getMarkdown(req.params.id, function(data) {
        render(res, data);
    });
};

function getMarkdown(id, cb) {
    var path = config.app.context + config.api.context + "/" + config.api.version + "/Tasks/" + id + ".md?shared=true";
    http.get({
        host: "localhost",
        path: path,
        port: config.app.port
    }, function (response) {
        var str = ""
        response.on("data", function (chunk) {
            str += chunk;
        });

        response.on("end", function () {
            cb(str);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

var render = function(res, markdown) {
    var slides = md.slidify(markdown, opts);

    res.send(Mustache.to_html(opts.template, {
        theme: opts.theme,
        highlightTheme: opts.highlightTheme,
        slides: slides,
        base: config.server.context + base,
        options: JSON.stringify(opts.revealOptions, null, 2)
    }));
};

var app = express();
["css", "js", "images", "plugin", "lib"].forEach(function(dir) {
    app.use("/" + dir, staticDir(path.join(opts.revealBasePath, dir)));
});
startMarkdownServer({app: app});

module.exports = app;
