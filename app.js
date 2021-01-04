const routes = require('./routes/index')

const app = require('express')()

const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use('/', routes.root)
app.use('/categories', routes.category)
app.use('/status', routes.orderState)
app.use('/products', routes.product)
app.use('/lists', routes.list)
app.use('/users', routes.user)
app.use('/orders', routes.order)

module.exports = app