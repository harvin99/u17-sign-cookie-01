const express = require('express')
const router = express.Router()

const authControllers = require('../controllers/auth.controller')


router.get('/login', authControllers.login)

module.exports = router