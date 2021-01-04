const router = require('express').Router()

router.get('/', (req, res) => {res.send('Server is working very well ;)')})

module.exports.root = router

module.exports.category = require('./CategoryRoute')

module.exports.orderState = require('./OrderStateRoute')

module.exports.product = require('./ProductRoute')

module.exports.list = require('./ListRoute')

module.exports.user = require('./UserRoute')

module.exports.order = require('./OrderRoute')

