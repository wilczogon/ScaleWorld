module.exports = function (app, dbUtils, connection) {
	passport = require('passport');
	LocalStrategy = require('passport-local').Strategy;
	
	app.use(passport.initialize());
	app.use(passport.session());

	isAuthenticated = function (req, res, next) {
	  if (req.isAuthenticated())
		return next();
	  res.redirect('/login');
	}

	passport.use(new LocalStrategy({
		passReqToCallback : true,
		usernameField : 'username',
        passwordField : 'password',
		}, 
	  function(err, username, password, done) {
		dbUtils.getUser(connection, username, function(user){
			if(user == null || user.password != password)
				return done(null, false, {'message': 'Authentication failed'});
			else
				return done(null, user);
		});
	  }
	));

	passport.serializeUser(function(user, done) {
		done(null, user.username);
	});

	passport.deserializeUser(function(name, done) {
		dbUtils.getUser(connection, name, function(user) {
			if(user == null)
				return done(null, false, {'message': 'User cannot be found.'});
			else
				return done(null, user);
		});
	});
}