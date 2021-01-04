const knex = require('../config/knex')
const jsonData = require('./jsonData')

module.exports.getAll = () => 
    knex('user')
        .select('*')
        .then(jsonData)

module.exports.getById = id => 
    knex('user')
        .where('id', id)
        .select('name',
                'email',
                'phone')
        .then(jsonData)

module.exports.getAllPasswords = () =>
    knex('user')
        .select('id',
                'password')
        .then(jsonData)

module.exports.create = user =>
    knex('user')
        .insert({
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password
        })

module.exports.updateEmail = user =>
    knex('user')
        .where('id', user.id)
        .update({
            email: user.email
        })

module.exports.updatePhone = user =>
    knex('user')
        .where('id', user.id)
        .update({
            phone: user.phone
        })

module.exports.updatePassword = user =>
    knex('user')
        .where('id', user.id)
        .update({
            password: user.password
        })