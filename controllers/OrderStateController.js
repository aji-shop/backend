const OrderState = require('../models/OrderState')

exports.getAll = (req, res) => {
    OrderState.getAll().then(data => {
        res.json(data)
    })
}