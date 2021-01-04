const List = require('../models/List')

exports.getAll = (req, res) => {
    List.getAll().then(data => {
        res.json(data)
    })
}

exports.getById = (req, res) => {
    List.getById(req.params.id).then(data => {
        res.json(data)
    })
}

exports.create = (req, res) => {
    const {
        id,
        product_id,
        count
    } = req.body

    List.create({
        id: id,
        product_id: product_id,
        count: count
    }).then(data => {
        res.json({
            'status': 'created'
        })
    })
}

exports.update = (req, res) => {
    const {
        id,
        product_id,
        count
    } = req.body

    List.update({
        id: id,
        product_id: product_id,
        count: count
    }).then(data => {
        res.json({
            'status': 'updated'
        })
    })
}

exports.deleteProduct = (req, res) => {
    const {
        id,
        product_id
    } = req.body

    List.deleteProduct({
        id: id,
        product_id: product_id
    }).then(data => {
        res.json({
            'status': 'deleted'
        })
    })
}