var passport = require("./passport").middleware();
var md5 = require("crypto-js/md5");

module.exports = {
    middleware: function() {
        return function(req, res, next) {
        	var auth = "7827d1dfa98cbb0040d7eb0d72c3448e";

        	if (md5(req.headers.authorization).toString() !== auth) {
            	return res.status(401).send("not logged in").end();
        	} else {
        		next();
        	}
        }
    }
};
