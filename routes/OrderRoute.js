const router = require('express').Router()
const OrderController = require('../controllers/OrderController')

router.get('/', OrderController.getAll)
router.get('/status/:id', OrderController.getByStatusId)
router.post('/', OrderController.create)
router.put('/status', OrderController.updateStatus)

module.exports = router