const {verify, sign} = require('jsonwebtoken')
const secret = require('../config/secret')

module.exports.autorize = (token, adminOnly, res, callback) => {
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

        callback(decoded)
    })
}

module.exports.createToken = id =>
    sign({
        id: id,
        exp: Date.now() + 24*60*60*1000 //token exists for a day
    }, secret)