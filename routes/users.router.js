const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
const userControllers = require('../controllers/users.controller')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: [], users: [], rents: []})
  .write()

router.get('/', userControllers.getUser)
router.get('/create_user', userControllers.createUser)
router.post('/create_user', userControllers.postCreateUser)
router.get('/:id', userControllers.getUserId)
router.post('/:id', userControllers.postUserId)
router.get('/:id/delete', (req, res) => {
  db.get('users').remove({id: req.params.id}).write()
  res.redirect('/users')
})

module.exports = router