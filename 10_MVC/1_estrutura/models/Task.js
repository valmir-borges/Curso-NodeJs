//Criando a tabela, pois o models é a camada que é o reflexo da tabela no banco

const {DataTypes} = require('sequelize')//Importando tipos de dados

const db = require('../db/conn')//Pegando a conexão com o banco, pois ela contém os dados do banco e as configurações, portanto será com ela que iremos criar as tabelas

//Definindo a tabela Task a partir da conexão com o banco
const Task = db.define('Task', {
    title:{//nome da coluna
        type: DataTypes.STRING,//tipo de dado
        required: true//obrigatório preencher esse campo para inserir no banco
    },
    description:{//nome da coluna
        type: DataTypes.STRING,//tipo de dado
        required: true//obrigatório preencher esse campo para inserir no banco
    },
    done:{//nome da coluna
        type: DataTypes.BOOLEAN,//tipo de dado
        required: true//obrigatório preencher esse campo para inserir no banco
    }
})

module.exports = Task//Exportando