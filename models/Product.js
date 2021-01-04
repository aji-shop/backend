const knex = require('../config/knex')

const jsonData = require('./jsonData')

module.exports.getAll = () => 
    knex('product')
        .select('*')
        .then(jsonData)

module.exports.getById = id => 
    knex('product')
        .where('id', id)
        .select('*')
        .then(jsonData)

module.exports.getByCategory = category => 
    knex('product')
        .where('category', category)
        .select('*')
        .then(jsonData)

module.exports.create = async (product) => {

        if (product.price <= 0) {
            throw new Error('Price must be greater than zero')
        }

        if (product.weight <= 0) {
            throw new Error('Weight must be greater than zero')
        }

        if (product.description === '') {
            throw new Error('Description cannot be empty')
        }

        if (product.name === '') {
            throw new Error('Name cannot be empty')
        }
    
        return knex('product')
            .insert({
                name: product.name,
                description: product.description,
                price: product.price,
                weight: product.weight,
                category_id: product.category_id
            })
    }

module.exports.update = async (product) => { 
        if (product.price <= 0) {
            return new Error('Price must be greater than zero')
        }

        if (product.weight <= 0) {
            return new Error('Weight must be greater than zero')
        }

        if (product.description === '') {
            return new Error('Description cannot be empty')
        }

        if (product.name === '') {
            return new Error('Name cannot be empty')
        }

        return knex('product')
                .where('id','=', product.id)
                .update({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    weight: product.weight,
                    category_id: product.category_id
                })
    }

