const express = require('express')
const router = express.Router()

const bookControllers = require('../controllers/books.controller')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: [], user: [], rents: []})
  .write()

router.get('/', bookControllers.getBook)
router.get('/create', bookControllers.createBook)
router.post('/create', bookControllers.postCreateBook)
router.get('/:id', bookControllers.getBookId)
router.post('/:id', bookControllers.postBookId)
router.get('/:id/delete', bookControllers.getBookIdToDelete)

module.exports = router