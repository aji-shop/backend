const {verify} = require('jsonwebtoken')
const secret = require('../config/secret')

module.exports = (token, adminOnly, res, callback) => {
    verify(token, secret, (err, decoded) => {
        if (err) {
            return res.sendStatus(403)
        }
    
        if (decoded.exp < Date.now()) {
            return res.status(401).send('Token expired')
        }
    
        if (adminOnly && decoded.id !== 0) {
            return res.status(401).send('Only admin can do this')
        }

        callback()
    })
}