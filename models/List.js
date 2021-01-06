const knex = require('../config/knex')
const jsonData = require('./jsonData')

module.exports.getAll = () => 
    knex('list')
        .join('product', 'list.product_id', '=', 'product.id')
        .select(
            'list.id', 
            'list.product_id', 
            'list.count',
            'product.name', 
            'product.description', 
            'product.price', 
            'product.weight', 
            'product.category_id')
        .then(jsonData)
        .then(data => 
            data.map(item => ({
                id: item.id,
                product: {
                    id: item.product_id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    weight: item.weight,
                    category_id: item.category
                },
                count: item.count
            })))

module.exports.getById = id =>
    knex('list')
        .where('list.id', id)
        .join('product', 'list.product_id', '=', 'product.id')
        .select(
            'product.id',
            'product.name', 
            'product.description', 
            'product.price', 
            'product.weight', 
            'product.category_id',
            'list.count')
        .then(jsonData)

module.exports.create = list =>
    knex('list')
        .insert({
            id: list.id,
            product_id: list.product_id,
            count: list.count
        })

module.exports.delete = list =>
    knex('list')
        .where('id', list.id)
        .andWhere('product_id', list.product_id)
        .delete()