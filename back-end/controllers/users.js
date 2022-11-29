const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const requestUserId = req.user.id;
  const users = await User.find(
    {_id: {$ne: requestUserId}},
    {id: '$_id', username: 1, _id: 0}
  );

  res.status(200).json(users);
};

module.exports = {
  getAllUsers,
};
