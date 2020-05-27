const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports.getUser = (req, res) => {
  res.render('users', {users: db.get('users').value()})
}
module.exports.createUser = (req, res) => {
  res.render('create_user')
}
module.exports.postCreateUser = (req, res) => {
  const id = shortid.generate()
  const user = {
    id: id,
    name: req.body.name,
    email: req.body.email + id,
    phone: req.body.phone,
    password: req.body.password
  }
  db.get('users')
    .push(user)
    .write()
  res.redirect('/users')
}
  
module.exports.getUserId = (req, res) => {
  const user = db.get('users').find({id: req.params.id}).value()
  res.render('edit_user', {user: user})
} 
  
  
module.exports.postUserId = (req, res) => {
  db.get('users')
  .find({ id: req.params.id})
  .assign({ name: req.body.name, phone: req.body.phone})
  .write()
  res.redirect('/users')
}
module.exports.getUserIdToDelete = (req, res) => {
  db.get('users').remove({id: req.params.id}).write()
  res.redirect('/users')
}