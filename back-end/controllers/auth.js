const login = (req, res) => {
    console.log('login');
    res.send('login')
}

const register = (req, res) => {
    res.send('login')
}

exports.login = login
exports.register = register

// export {login, register}