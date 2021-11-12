const passportJWT = require("passport-jwt")
const User = require("./models/User");
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const jwtStrategy = new JwtStrategy(jwtOptions, async function (jwtPayload, done) {
  try {
    const user = await User.findById(jwtPayload.id);

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
})

module.exports = {
  jwtOptions,
  jwtStrategy,
}
