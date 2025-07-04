const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')

const routes = require('./routes')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public'))) 

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

// Http logger
// app.use(morgan('combined'))

// Teamplate engine setup
app.engine('hbs', engine(
  {
    extname: '.hbs',
  }
))
app.set('view engine', 'hbs')

// Static files
app.set('views', path.join(__dirname, 'resources/view'))

// Routes init
routes(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
