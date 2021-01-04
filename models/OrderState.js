const knex = require('../config/knex')
const jsonData = require('./jsonData')

module.exports.getAll = () => knex('order_state').select('*').then(jsonData);