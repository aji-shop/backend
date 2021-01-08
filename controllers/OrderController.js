const Order = require('../models/Order')
const List = require('../models/List')
const {autorize} = require('./jwt')
const DATE_FORMATER = require('dateformat')

const format_date = data => {
    data.forEach(item => {
        item.date = DATE_FORMATER(new Date(item.date), "dd-mm-yyyy HH:MM:ss")
    })
}

exports.getAll = (req, res) => {
    autorize(
        req.headers.token,
        true,
        res,
        () => {
            Order.getAll().then(data => {
                const result = data.slice()
                
                format_date(result)
                
                List.getAll().then(list => {

                    result.forEach(item => {
                        item.list = []
                        for(let record of list) {
                            if (record.id === item.id) item.list.push({
                                product: record.product,
                                count: record.count
                            })
                        }
                    })

                    res.json(result)
                })
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
                const result = data.slice()

                format_date(result)

                List.getAll().then(list => {

                    result.forEach(item => {
                        item.list = []
                        for(let record of list) {
                            if (record.id === item.id) item.list.push({
                                product: record.product,
                                count: record.count
                            })
                        }
                    })

                    res.json(result)
                })
            })
        })    
}

exports.create = (req, res) => {
    autorize(
        req.body.token,
        false,
        res,
        (decoded) => {
            const {
                id,
                date,
            } = req.body

        Order.create({
                id: id,
                date: new Date(),
                state_id: 2,
                user_id: decoded.id
            }).then(
            data => {
                res.json({
                    'status': 'ok'
                })
            },
            error => {
                res.json({
                    'status': 'failed',
                    'error': error.message
                })
            })
        })    
}

exports.updateStatus = (req, res) => {
    autorize(
        req.body.token,
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
                res.json({
                    'status': 'failed',
                    'error': error.message
                })
            })
        })    
}