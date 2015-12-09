var passport = require("passport");
var LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = {
    middleware: function(req, res, next) {
        // console.log(req.body);
        // passport.authenticate("local")
        passport.authenticate("local", function(err, user, info) {
            console.log(arguments);
            if (err) {
                return next(err);
            }
            if (!user) {
                //return res.status(401).send("not logged in").end();
            }
            next();
            // req.logIn(user, function(err) {
            //     if (err) {
            //         return next(err);
            //     }
            // });
        })(req, res, next);
    }
};
