const passport = require('passport');

const passportAuthenticate = () =>
  passport.authenticate('jwt', {session: false});

module.exports = {
  passportAuthenticate,
};
