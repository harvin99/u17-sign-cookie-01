const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports.login = (req, res) => {
  res.render('auth/login')
}
module.exports.postLogin = (req, res) => {
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
  if(user.password !== password){
    res.render('auth/login', {
      errors: [
        'Wrong password'
      ],
      values: req.body
    })
    return 
  }
  res.cookie('user_id', user.id)
  res.redirect('/users')
}