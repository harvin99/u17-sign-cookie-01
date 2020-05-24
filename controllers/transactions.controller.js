const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: [], users: [], rents: []})
  .write()
module.exports.getTransaction = (req, res) => {
  res.render('transactions', {trans: db.get('rents').value()})
}
module.exports.getCreateTransaction = (req, res) => {
  res.render('transactions_create',{
    users: db.get('users').value(),
    books: db.get('books').value()
  })
}

module.exports.postCreateTransaction = (req, res) => {
  const rent = {
    userId: req.body.selectedname,
    bookId: req.body.selectedbook
  }
  db.get('rents').push(rent).write()
  res.redirect('/transactions')
}