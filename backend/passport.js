var passport = require("passport");
var LocalStrategy = require("passport-local");
var config = require("../config");

passport.use(new LocalStrategy(
  function(username, password, done) {
      console.log("find stuff");
      User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
              return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(password)) {
              return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
      });
  }
));

module.exports = {
    middleware: function(app) {
        app.use(passport.initialize());

        return function(req, res, next) {
            if (!config.user.authRequired) {
                return next();
            }
            passport.authenticate("local", function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    req.session.user = {"name": "fred"};
                    return res.status(401).send("not logged in").end();
                }
                next();
            })(req, res, next);
        }
    }
};
