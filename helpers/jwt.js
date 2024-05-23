const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}