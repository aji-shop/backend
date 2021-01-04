module.exports = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '1234567890',
      database : 'shop'
    }
  })