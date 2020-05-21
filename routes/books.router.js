const express = require('express')
const router = express.Router()

router.get('/books', (req, res) => {
  res.render('books', {list : db.get('books').value()})
})
router.get('/books/create', (req, res) => {
  res.render('create')
})
router.post('/books/create', (req, res) => {
  const book = {
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description
  }
  db.get('books').push(book).write()
  res.redirect('/books')
})
router.get('/books/:id', (req, res) => {
  const book = db.get('books').find({id: req.params.id}).value()
  res.render('edit', {book: book})
})
router.post('/books/:id', (req, res) => {
  db.get('books')
  .find({ id: req.params.id})
  .assign({ title: req.body.title, description: req.body.description})
  .write()
  res.redirect('/books')
})
router.get('/books/:id/delete', (req, res) => {
  db.get('books').remove({id: req.params.id}).write()
  res.redirect('/books')
})

module.exports = router