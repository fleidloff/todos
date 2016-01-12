var passport = require("./passport").middleware();

module.exports = {
    middleware: function() {
        return function(req, res, next) {
            return res.status(200).send("foo: " + req.url + ", headers: " + req.headers).end();
        }
    }
};
