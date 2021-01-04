const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)
router.get('/passwords', UserController.getAllPasswords)
router.post('/', UserController.create)
router.put('/email', UserController.updateEmail)
router.put('/phone', UserController.updatePhone)
router.put('/password', UserController.updatePassword)


module.exports = router