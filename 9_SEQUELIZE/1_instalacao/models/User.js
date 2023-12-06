const {DataTypes} = require('sequelize')//Esse objeto no pacote sequelize serve para determinar o tipo de dado que será inserido em uma coluna de tabela

const db = require('../db/conn')//Pegando nossa conexão com o banco para que o sequelize consiga criar a tabela

const User = db.define('User', {//Foi pego a conexão com o banco e definindo nela uma tabela chamada User, mas por padrão ele adiciona um s no final, então aparece Users
    name:{//Foi definido uma tabela chamada name
        type: DataTypes.STRING,//Com o tipo de dado STRING
        allowNull: false//Que não aceita valor nulo
    },
    occupation:{
        type: DataTypes.STRING,
        require: true//É necessário que o usuário insira algum valor
    },
    newsletter: {
        type: DataTypes.BOOLEAN//Tipo de dado, 1 ou 0, true ou false 
    }
})

module.exports =  User