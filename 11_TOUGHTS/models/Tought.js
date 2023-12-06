const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

//Definindo a tabela Tought a partir da conexão do banco
const Tought = db.define('Tought',{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})
Tought.belongsTo(User)//O pensamento pertence a tabela User
User.hasMany(Tought)//E um usuário tem vários pensamentos
module.exports = Tought