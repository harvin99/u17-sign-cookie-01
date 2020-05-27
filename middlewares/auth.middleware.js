const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)


module.exports.requireAuth = (req, res, next) => {
  if(!req.cookies.user_id){
    res.redirect('/auth/login')
    return
  }
  const user = db.get('users').find({id: req.cookies.user_id}).value()
  if(!user){
    res.redirect('/auth/login')
    return
  }
  next()
}