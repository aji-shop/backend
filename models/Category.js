const knex = require('../config/knex')
const jsonData = require('./jsonData')

module.exports.getAll = () => knex('category').select('*').then(jsonData);
