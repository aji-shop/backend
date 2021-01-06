const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)
router.post('/auth', UserController.auth)
router.post('/', UserController.create)


module.exports = router