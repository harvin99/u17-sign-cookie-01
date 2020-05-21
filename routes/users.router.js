const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: [], users: []})
  .write()

router.get('/', (req, res) => {
  res.render('users', {users: db.get('users').value()})
})
router.get('/create_user', (req, res) => {
  res.render('create_user')
})
router.post('/create_user', (req, res) => {
  const user = {
    id: shortid.generate(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }
  db.get('users')
    .push(user)
    .write()
  res.redirect('/users')
})
module.exports = router