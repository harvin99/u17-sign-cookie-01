
const bcrypt = require('bcrypt')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports.login = (req, res) => {
  res.render('auth/login')
}
module.exports.postLogin = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  
  const user = db.get('users').find({email: email}).value()
  
  if(!user){
    res.render('auth/login', {
      errors: [
        'User does not exist.',
      ],
      values: req.body
    })
    return
  }
  
  if(!await bcrypt.compare(password, user.password)){
    res.render('auth/login', {
      errors: [
        'Wrong password'
      ],
      values: req.body
    })
    return 
  }
  res.cookie('userId', user.id, {
    signed: true
  })
  res.redirect('/users')
}