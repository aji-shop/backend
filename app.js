const routes = require('./routes/index')

const app = require('express')()

const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
  });

app.use('/', routes.root)
app.use('/categories', routes.category)
app.use('/status', routes.orderState)
app.use('/products', routes.product)
app.use('/lists', routes.list)
app.use('/users', routes.user)
app.use('/orders', routes.order)


const jwt = require('jsonwebtoken')
const secret = require('./config/secret')

app.post('/check', (req, res) => {
  jwt.verify(req.headers.token,secret, (err, decoded) => {
    if (err) {
      return res.status(401).send(err)
    }

    if (Date.now() > decoded.exp) {
      return res.status(401).send('Token was expired')
    }

    res.json(decoded)
  })
})

module.exports = app