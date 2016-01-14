var auth = require("./auth");
var config = require("../config");
var baseUrl = config.app.context + config.api.context + "/" + config.api.version;
var urls = {
    login: baseUrl + "/login",
    logout: baseUrl + "/logout",
}

module.exports = {
    middleware: function() {
        return function(req, res, next) {
        	auth.middleware()(req, res, function() {
                if (req.url === urls.login) {
                    return res.status(204).end();
                }
                if (req.url === urls.logout) {
                    auth.logout(req.session);
                    return res.status(401).send("not logged in").end();
                }

                next();
            });
        }
    }
};
