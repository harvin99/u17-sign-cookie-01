const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: [], user: [], rent: []})
  .write()

router.get('/', (req, res) => {
  res.render('books', {list : db.get('books').value()})
})
router.get('/create', (req, res) => {
  res.render('create')
})
router.post('/create', (req, res) => {
  const book = {
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description
  }
  db.get('books').push(book).write()
  res.redirect('/books')
})
router.get('/:id', (req, res) => {
  const book = db.get('books').find({id: req.params.id}).value()
  res.render('edit', {book: book})
})
router.post('/:id', (req, res) => {
  db.get('books')
  .find({ id: req.params.id})
  .assign({ title: req.body.title, description: req.body.description})
  .write()
  res.redirect('/books')
})
router.get('/:id/delete', (req, res) => {
  db.get('books').remove({id: req.params.id}).write()
  res.redirect('/books')
})

module.exports = router