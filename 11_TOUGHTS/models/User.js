const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('User', {
    name:{//O name será responsável por ligar 1 usuário a vários pensamentos
        type: DataTypes.STRING,
        require: true
    },
    email:{
        type: DataTypes.STRING,
        require: true
    },
    password:{
        type: DataTypes.STRING,
        require: true
    }
})
module.exports = User