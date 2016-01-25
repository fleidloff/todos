var md5 = require("crypto-js/md5");
var uuid = require("node-uuid");
var atob = require("atob");
var config = require("../../config");
var minutes = 1000*60;
var hours = 60*minutes;
var sessionExpiration = 3*hours;
var log4js = require("log4js");
var logger = log4js.getLogger("auth");

var sessions = {};

function deleteAfterExpiration(session) {
    clearTimeout(session.timeoutHandler);
    session.timeoutHandler = setTimeout(function() {
        delete sessions[session.id];
    }, sessionExpiration);
}

function userFromAuth(auth) {
    if (!config.user.authRequired) {
        return "Hans";
    }
    return atob(auth).split(":")[0];
}

function getSession(id, auth) {
    if (id && sessions[id]) {
        deleteAfterExpiration(sessions[id]);
        return sessions[id];
    }
    var session = {
        id: uuid.v4(),
        expires: sessionExpiration,
        user: userFromAuth(auth)
    }

    sessions[session.id] = session;

    deleteAfterExpiration(session);

    return session;
}

var auth = "7827d1dfa98cbb0040d7eb0d72c3448e";
function authorized(req) {
    return (md5(req.headers.authorization).toString() === auth);
}

function sessionUndefined(req) {
    return (typeof sessions[req.headers["x-session-id"]] === "undefined");
}

module.exports = {
    middleware: function() {
        return function(req, res, next) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");

            if(req.query.shared && req.method === "GET") {
                req.url=req.url.replace(".md", "");
                req.query.select="description";
                const tmp = res.end.bind(res);
                res.end = function(f) {
                    const description = JSON.parse(f).description;
                    res.setHeader("Content-Length", description.length);
                    res.setHeader("Content-Type", "text/markdown; charset=UTF-8");
                    return tmp("" + description || "no data");
                }
                return next();
            };
            if (config.user.authRequired && !authorized(req) && sessionUndefined(req)) {
                return res.status(401).send("not logged in").end();
            } else {
                const session = getSession(req.headers["x-session-id"], req.headers.authorization);
                res.setHeader("x-session-id", "" + session.id);
                req.session = session;
                return next();
            }
        }
    },
    logout: function(session) {
        delete sessions[session.id];
    }
};
