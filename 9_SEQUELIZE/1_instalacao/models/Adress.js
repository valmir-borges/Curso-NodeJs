const {DataTypes} = require('sequelize')//Esse objeto no pacote sequelize serve para determinar o tipo de dado que será inserido em uma coluna de tabela

const db = require('../db/conn')//Pegando nossa conexão com o banco para que o sequelize consiga criar a tabela

const User = require('./User')//Pegando a tabela de usuário

//Criando a tabela que irá ser relacionada
const Adress = db.define('Adress', {//Foi pego a conexão com o banco e definindo nela uma tabela chamada User, mas por padrão ele adiciona um s no final, então aparece Users
    street:{
        type: DataTypes.STRING,
        require
    },
    number:{
        type: DataTypes.STRING,
        require
    },
    city:{
        type: DataTypes.STRING,
        require
    },
})
User.hasMany(Adress)//Está dizendo que um dado da tabela user pode ter vários endereços, porém 1 endereço pertence somente a 1 usuário

//Relacionando a tabela Adress com a tabela User, sendo a User a principal
Adress.belongsTo(User)//Está dizendo que a tabela endereço pertence a usuário, portanto automaticamente é adicionado na tabela Adress uma coluna de Id da tabela User

module.exports =  Adress