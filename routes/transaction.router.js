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


module.exports = router