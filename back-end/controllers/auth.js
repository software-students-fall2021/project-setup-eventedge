const login = (req, res) => {
    console.log('login');
    res.send('login')
}

const register = (req, res) => {
    res.send('login')
}

module.exports = {
    login,
    register,
}
