const List = require('../models/List')
const {autorize} = require('./jwt')


exports.getAll = (req, res) => {
    autorize(
        req.headers.token,
        true,
        res,
        () => {
            List.getAll().then(data => {
                res.json(data)
            })  
        })
}

exports.getById = (req, res) => {
    autorize(
        req.headers.token, 
        false,
        res,
        () => {
            List.getById(req.params.id).then(data => {
                res.json(data)
            })
        })    
}

exports.create = (req, res) => {
    autorize(
        req.headers.token, 
        false,
        res,
        () => {
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
        })     
}

exports.delete = (req, res) => {
    autorize(
        req.headers.token, 
        false,
        res,
        () => {
            const {
                id,
                product_id
            } = req.body
        
            List.delete({
                id: id,
                product_id: product_id
            }).then(data => {
                res.json({
                    'status': 'deleted'
                })
            })
        })     
}