var config = require("../config");

function userFromSession(session) {
    return session.user;
}

module.exports = {
    middleware: function() {
        return function(req, res, next) {
            //console.log("user", req.session.user, req.session);
            req.session.user="foo";
            req.session.save();
            if (!config.user.authRequired) {
                return next();
            }
            var user = userFromSession(req.session);
            if (!user) {
                req.session.user = {"name": "fred"};
                return res.status(401).send("not logged in").end();
            }
        }
    }
};
