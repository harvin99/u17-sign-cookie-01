const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/users.controller')

router.get('/', userControllers.getUser)
router.get('/create_user', userControllers.createUser)
router.post('/create_user', userControllers.postCreateUser)
router.get('/:id', userControllers.getUserId)
router.post('/:id', userControllers.postUserId)
router.get('/:id/delete', userControllers.getUserIdToDelete)

module.exports = router