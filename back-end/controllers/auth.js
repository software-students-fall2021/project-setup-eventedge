const User = require('../models/User');
const {createSignedToken} = require('../utils/create-signed-token');

const login = async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await User.findOne({username})

    if (await user.validatePassword(password)) {
      res.json({success: true, username, token: createSignedToken(user.id)})
    } else {
      res.status(401).json({success: false, message: 'Password is incorrect!'});
    }
  } catch (e) {
    res.status(401).json({success: false, message: 'User not found!'});
  }
};

const register = async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await User.create({username, password});
    res.json({success: true, username, token: createSignedToken(user.id)});
  } catch (e) {
    res.status(401).json({success: false, message: 'User with this name already exists!'});
  }
};

module.exports = {
  login,
  register,
};
