const passportJWT = require('passport-jwt');
const User = require('../models/User');
const JwtStrategy = passportJWT.Strategy;
const {jwtOptions} = require('./jwt-options');

const jwtStrategy = new JwtStrategy(jwtOptions, async function (
  jwtPayload,
  done
) {
  try {
    const user = await User.findById(jwtPayload.id);

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

module.exports = {
  jwtStrategy,
};
