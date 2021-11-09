const {request} = require('./axios');

const register = async (req, res) => {
    const {username, password, confirmPassword} = 
        req.body;

    res.status(200).json({
        username,
        password,
        confirmPassword,
    });
};

module.exports = {
    register,
};