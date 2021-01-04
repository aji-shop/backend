const router = require('express').Router()
const ListController = require('../controllers/ListController')

router.get('/', ListController.getAll)
router.get('/:id', ListController.getById)
router.post('/', ListController.create)
router.put('/', ListController.update)
router.delete('/', ListController.deleteProduct)

module.exports = router