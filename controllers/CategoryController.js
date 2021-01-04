const Category = require('../models/Category')

exports.getAll = (req, res) => {
    Category.getAll().then(data => {
        res.json(data)
    })
}