const knex = require('../config/knex')
const jsonData = require('./jsonData')

const {getById} = require('./List')

module.exports.getAll = () =>
    knex('order')
    .join('user','user.id','=','order.user_id')
        .select(
            'order.id',
            'order.date',
            'order.state_id',
            'user.name',
            'user.email',
            'user.phone')
        .then(jsonData)

module.exports.getByStatusId = id =>
    knex('order')
        .where('state_id', id)
        .join('user','user.id','=','order.user_id')
        .select(
            'order.id',
            'order.date',
            'order.state_id',
            'user.name',
            'user.email',
            'user.phone')
        .then(jsonData)

module.exports.create = order =>
    knex('order')
        .insert({
            id: '' + order.id,
            state_id: order.state_id,
            user_id: order.user_id,
            date: order.date
        })
        .then(jsonData)

module.exports.updateStatus = order =>
    knex('order')
        .where('id', order.id)
        .select('state_id')
        .then(jsonData)
        .then(data => {
            if (data.state_id === 4 && order.state_id === 1) {
                throw new Error('"Executed" state cannot be changed to "Not Approved"')
            }
            if (data.state_id === 4 && order.state_id === 3) {
                throw new Error('"Executed" state cannot be changed to "Cancelled"')
            }
            if (data.state_id === 3 && order.state_id === 4) {
                throw new Error('"Cancelled" state cannot be changed to "Executed"')
            }
            if (data.state_id === 2 && order.state_id === 1) {
                throw new Error('"Approved" state cannot be changed to "Not Approved"')
            }
            if (order.state_id > 4) {
                throw new Error('State with id=' + order.state_id + ' does not exist')
            }

            return knex('order')
                        .where('id', order.id)
                        .update({
                            state_id: order.state_id
                        })
        })