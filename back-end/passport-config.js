const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.JWT_SECRET,
}

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwtPayload, done) {
  const users = require("./user_data.js")

  // try to find a matching user in our "database"
  // usually we would do this by finding matching records in a real database... here we're searching the hard-coded mock data in our 'user_data.js' file
  const user = users[_.findIndex(users, { id: jwtPayload.id })] // find a matching user using a convenient lodash function... we would normally look this user up in a real database
  if (user) {
    // we found the user... keep going
    done(null, user)
  } else {
    // we didn't find the user... fail!
    done(null, false)
  }
})

module.exports = {
  jwtOptions,
  jwtStrategy,
}
