const Product = require('../models/Product')

exports.getAll = (req, res) => {
    Product.getAll().then(data => {
        res.json(data)
    })
}

exports.getById = (req, res) => {
    Product.getById(req.params.id).then(data => {
        res.json(data)
    })
}

exports.create = (req, res) => {
    const {
        name, 
        description, 
        price, 
        weight, 
        category_id
    } = req.body

    Product.create({
        name: name,
        description: description,
        price: price,
        weight: weight,
        category_id: category_id
    })
    .then(
    product => {
        res.json({
            'status': 'ok'
        })
    },
    error => {
        res.status(406).json({
            'status': 'failed',
            'error': error.message
        })
    })
}

exports.update = (req, res) => {
    const {
        id,
        name,
        description,
        price,
        weight,
        category_id
    } = req.body

    Product.update({
        id: id,
        name: name,
        description: description,
        price: price,
        weight: weight,
        category_id: category_id
    }).then(
    product => {
        res.json({
            'status': 'ok'
        })
    },
    error => {
        res.status(406).json({
            'status': 'failed',
            'error': error.message
        })
    })
}