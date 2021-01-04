const User = require('../models/User')

exports.getAll = (req, res) => {
    User.getAll().then(data => {
        res.json(data)
    })
}

exports.getById = (req, res) => {
    User.getById(req.params.id).then(data => {
        res.json(data)
    })
}

exports.getAllPasswords = (req, res) => {
    User.getAllPasswords().then(data => {
        res.json(data)
    })
}

exports.create = (req, res) => {
    const {
        name,
        email,
        phone,
        password
    } = req.body;

    User.create({
        name: name,
        email: email,
        phone: phone,
        password: require('crypto').createHash('sha1').update(password, 'utf-8').digest('hex')
    }).then(user => {
        res.json({
            'status': 'ok'
        })
    })
}

exports.updateEmail = (req, res) => {
    const {
        id,
        email
    } = req.body

    User.updateEmail({
        id: id,
        email: email
    }).then(user => {
        res.json({
            'status': 'ok'
        })
    })
}

exports.updatePhone = (req, res) => {
    const {
        id,
        phone
    } = req.body;

    User.updatePhone({
        id: id,
        phone: phone
    }).then(user => {
        res.json({
            'status': 'ok'
        })
    })
}

exports.updatePassword = (req, res) => {
    const {
        id, 
        password
    } = req.body

    User.updatePassword({
        id: id,
        password: require('crypto').createHash('sha1').update(password,'utf-8').digest('hex')
    }).then(user => {
        res.json({
            'status': 'ok'
        })
    })
}