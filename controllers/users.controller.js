const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
//for db
const adapter = new FileSync('db.json')
const db = low(adapter)
//Set default db
db.defaults({ books: [], users: [], rents: []})
  .write()

module.exports.getUser = (req, res) => {
  res.render('users', {users: db.get('users').value()})
}
module.exports.createUser = (req, res) => {
  res.render('create_user')
}
module.exports.postCreateUser = (req, res) => {
  const errors = []
  if(req.body.name.length >= 30)
    errors.push('Name length is too more than 30 charaters')
  if(!req.body.name)
    errors.push('Name is required')
  if(!req.body.email)
    errors.push('Email is required')
  if(!req.body.phone)
    errors.push('Phone is required')
  if(errors.length){
    res.render('create_user', {
      errors: errors,
      values: req.body
    })
    return
  }
  const user = {
    id: shortid.generate(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
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
  .assign({ name: req.body.name, email: req.body.emai, phone: req.body.phone})
  .write()
  res.redirect('/users')
}
module.exports.getUserIdToDelete = (req, res) => {
  db.get('users').remove({id: req.params.id}).write()
  res.redirect('/users')
}