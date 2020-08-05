const passport = require('passport');

module.exports.checkAuthenticated = passport.authenticate('jwt', { session: false });