const mongoose = require('mongoose')
const {Schema} = mongoose//Pegando o Schema do mongoose, ele se trata de um esqueleto do dado a ser inserido na collection

const Product = mongoose.model(//O próprio mongoose tem um método que cria model, basta somente inserir o Schema dentro dela
    'Product',//Nome do model que ele irá criar
    new Schema({//Depois basta dizer o Schema, ou seja, os campos do model (collection)
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},

    })
)

module.exports = Product