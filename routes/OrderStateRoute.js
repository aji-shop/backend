const router = require('express').Router()
const OrderStateController = require('../controllers/OrderStateController')

router.get('/', OrderStateController.getAll)

module.exports = router