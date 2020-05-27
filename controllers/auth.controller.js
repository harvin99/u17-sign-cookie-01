const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//for db
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports.getUser = (req, res) => {
  res.render('users', {users: db.get('users').value()})
}
module.exports.login = (req, res) => {
  res.render('users/login')
}