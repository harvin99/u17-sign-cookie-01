const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: [], users: [], rents: []})
  .write()

module.exports.getBook = (req, res) => {
  res.render('books', {list : db.get('books').value()})
}

module.exports.createBook = (req, res) => {
  res.render('create')
}

module.exports.postCreateBook = (req, res) => {
  const book = {
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description
  }
  db.get('books').push(book).write()
  res.redirect('/books')
}

module.exports.getBookId = (req, res) => {
  const book = db.get('books').find({id: req.params.id}).value()
  res.render('edit', {book: book})
}

module.exports.postBookId = (req, res) => {
  db.get('books')
  .find({ id: req.params.id})
  .assign({ title: req.body.title, description: req.body.description})
  .write()
  res.redirect('/books')
}

module.exports.getBookIdToDelete = (req, res) => {
  db.get('books').remove({id: req.params.id}).write()
  res.redirect('/books')
}

