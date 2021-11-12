const jwt = require("jsonwebtoken");
const {jwtOptions} = require('../passport-config');

const createSignedToken = (id) => jwt.sign({id}, jwtOptions.secretOrKey);

module.exports = {createSignedToken};
