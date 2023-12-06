const mongoose = require('../db/conn')
const {Schema} = mongoose

const User = mongoose.model(//O próprio mongoose tem um método que cria model, basta somente inserir o Schema dentro dela
    'User',//Nome do model que ele irá criar
    new Schema({//Depois basta dizer o Schema, ou seja, os campos do model (collection)
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        phone: {
            type: String,
            required: true
        }
    }, {timestamps: true},//Ele irá dois novos campos(colunas) que vai ser quando ele foi criado e quando ele foi atualizado
    )
)

module.exports = User