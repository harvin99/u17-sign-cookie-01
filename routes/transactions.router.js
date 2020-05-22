const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: [], users: [], rents: []})
  .write()

router.get('/', (req, res) => {
  res.render('transactions', {trans: db.get('rents').value()})
})
router.get('/create', (req, res) => {
  res.render('transactions_create',{
    users: db.get('users').value(),
    books: db.get('books').value()
  })
})
router.post('/create', (req, res) => {
  
  const rent = {
    userId: req.body.selectedname,
    bookId: req.body.bookId
  }
  console.log(rent)
  //db.get('rents').push(rent).write()
  res.redirect('/transactions')
})
module.exports = router