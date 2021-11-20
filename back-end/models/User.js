const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtOptions} = require('../configs/jwt-options');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    password: {type: String, required: true},
    chats: {type: Array, default: []},
    pendingEvents: {type: Array, default: []},
    acceptedEvents: {type: Array, default: []},
  },
  {timestamps: true}
);

userSchema.plugin(uniqueValidator, {message: 'User already exists!'});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign({id: this.id}, jwtOptions.secretOrKey, {expiresIn: '2 days'});
};

module.exports = mongoose.model('User', userSchema);
