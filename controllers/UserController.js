const User = require('../models/User')
const crypto = require('crypto')
const autorize = require('./autorize')

const hash = (salt, password) =>
    crypto.createHash('sha1')
                .update(salt + crypto
                                .createHash('sha1')
                                .update(password, 'utf-8')
                                .digest('base64'), 
                        'utf-8')
                .digest('base64')

const createToken = id =>
    jwt.sign({
        id: id,
        exp: Date.now() + 24*60*60*1000
    }, secret)

exports.getAll = (req, res) => {
    autorize(
        req.headers.token, 
        true, 
        res,
        () => {
            User.getAll().then(data => {
                res.json(data)
            })
        })    
}

exports.getById = (req, res) => {
    autorize(
        req.headers.token, 
        true, 
        res,
        () => {
            User.getById(req.params.id).then(data => {
                res.json(data)
            })
        })    
}

exports.create = (req, res) => {
    const {
        name,
        email,
        phone,
        password
    } = req.body;

    const salt = Math.floor(Math.random()*1000000000000).toString(16)

    User.create({
        name: name,
        email: email,
        phone: phone,
        password: hash(salt, password),
        salt: salt
    }).then(user => {

        const token = createToken(user[0])
      
        res.json({
            token: token,
            user: {
              name: name,
              email: email,
              phone: phone
            }
          })
    })
}

exports.auth = (req, res) => {
    const {
        email,
        password
    } = req.headers

    User.getSalt(email).then(user => {
        User.auth({
            email: email,
            password: hash(user[0].salt, password)
        }).then(user => {
            if(user.length === 0) {
                return res.status(404).send('User not found')
              }
          
              const {
                id,
                name,
                email,
                phone
              } = user[0]
              
          
              const token = createToken(id)
          
              res.json({
                token: token,
                user: {
                  name: name,
                  email: email,
                  phone: phone
                }
              })
        })

    })

    
}