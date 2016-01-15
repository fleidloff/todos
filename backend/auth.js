var md5 = require("crypto-js/md5");
var uuid = require("node-uuid");
var atob = require("atob");
var minutes = 1000*60;
var hours = 60*minutes;
var sessionExpiration = 3*hours;


var sessions = {};

function deleteAfterExpiration(session) {
    clearTimeout(session.timeoutHandler);
    session.timeoutHandler = setTimeout(function() {
        delete sessions[session.id];
    }, sessionExpiration);
}

function userFromAuth(auth) {
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

module.exports = {
    middleware: function() {
        return function(req, res, next) {
            var auth = "7827d1dfa98cbb0040d7eb0d72c3448e";

            if ((md5(req.headers.authorization).toString() !== auth) && (typeof sessions[req.headers["x-session-id"]] === "undefined")) {
                return res.status(401).send("not logged in").end();
            } else {
                const session = getSession(req.headers["x-session-id"], req.headers.authorization);
                res.setHeader("x-session-id", "" + session.id);
                req.session = session;
                next();
            }
        }
    },
    logout: function(session) {
        delete sessions[session.id];   
    }
};