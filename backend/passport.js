var config = require("../config");

function userFromSession(session) {
    return session.user;
}

module.exports = {
    middleware: function() {
        return function(req, res, next) {
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
