const mongoose = require('../db/conn')
const {Schema} = mongoose

const Pet = mongoose.model(//O próprio mongoose tem um método que cria model, basta somente inserir o Schema dentro dela
    'Pet',//Nome do model que ele irá criar
    new Schema({//Depois basta dizer o Schema, ou seja, os campos do model (collection)
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        images: {
            type: Array,//Tipo array pois pode ter várias fotos do mesmo pet
            required: true
        },
        available: {//Se o pet foi adotado ou não
            type: Boolean,
        },
        //Basicamente é a informação de quem adotou e de quem é o pet
        user: Object,
        adopter: Object,
    }, {timestamps: true},//Ele irá dois novos campos(colunas) que vai ser quando ele foi criado e quando ele foi atualizado
    )
)

module.exports = Pet