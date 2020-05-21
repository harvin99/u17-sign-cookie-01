const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: [], users: [], rent: []})
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
router.get('/:id', (req, res) => {
  const user = db.get('users').find({id: req.params.id}).value()
  res.render('edit_user', {user: user})
})
router.post('/:id', (req, res) => {
  db.get('users')
  .find({ id: req.params.id})
  .assign({ name: req.body.name, email: req.body.emai, phone: req.body.phone})
  .write()
  res.redirect('/users')
})
router.get('/:id/delete', (req, res) => {
  db.get('users').remove({id: req.params.id}).write()
  res.redirect('/users')
})

module.exports = router