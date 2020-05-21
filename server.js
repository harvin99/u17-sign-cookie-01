// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express")
const app = express()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: []})
  .write()
//For body parser 
app.use(express.urlencoded({extended: false}))

//Set view engine template
app.set('view engine', 'pug')
app.set('views', './views')
//Router
app.get('/', (req,res) => {
  res.render('index')
})
app.get('/books', (req, res) => {
  res.render('books', {list : db.get('books').value()})
})
app.get('/books/create', (req, res) => {
  res.render('create')
})
app.post('/books/create', (req, res) => {
  const book = {
    id: shortid.generate(),
    title: req.body.title,
    description: req.body.description
  }
  db.get('books').push(book).write()
  res.redirect('/books')
})
app.get('/books/:id', (req, res) => {
  const book = db.get('books').find({id: req.params.id}).value()
  res.render('edit', {book: book})
})
app.post('/books/:id', (req, res) => {
  db.get('books')
  .find({ id: req.params.id})
  .assign({ title: req.body.title, description: req.body.description})
  .write()
  res.redirect('/books')
})
app.get('/books/:id/delete', (req, res) => {
  db.get('books').remove({id: req.params.id}).write()
  res.redirect('/books')
})
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
