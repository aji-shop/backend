const Order = require('../models/Order')

const autorize = require('./autorize')

exports.getAll = (req, res) => {
    autorize(
        req.headers.token,
        true,
        res,
        () => {
            Order.getAll().then(data => {
                res.json(data)
            })
        })    
}

exports.getByStatusId = (req, res) => {
    autorize(
        req.headers.token,
        true,
        res,
        () => {
            Order.getByStatusId(req.params.id).then(data => {
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
                date,
                state_id,
                user_id
            } = req.body
        
            Order.create({
                id: id,
                date: date,
                state_id: state_id,
                user_id: user_id
            }).then(
            data => {
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
        })    
}

exports.updateStatus = (req, res) => {
    autorize(
        req.headers.token,
        true,
        res,
        () => {
            const {
                id,
                state_id
            } = req.body
        
            Order.updateStatus({
                id: id,
                state_id: state_id
            }).then(data => {
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
        })    
}