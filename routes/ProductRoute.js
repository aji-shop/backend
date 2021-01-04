const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getById)
router.post('/', ProductController.create)
router.put('/', ProductController.update)

module.exports = router