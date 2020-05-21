// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express")
const app = express()
const booksRouter = require('./routes/books.router.js')
const usersRouter = require('./routes/users.router.js')
//For body parser 
app.use(express.urlencoded({extended: false}))

//Set view engine template
app.set('view engine', 'pug')
app.set('views', './views')
//Router
app.get('/', (req,res) => {
  res.render('index')
})
app.use('/books', booksRouter)
app.use('/users', usersRouter)// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
