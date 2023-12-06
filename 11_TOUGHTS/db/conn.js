const {Sequelize} = require('sequelize')//Importando o objeto da conexão com o banco, em que cada chave receberá o valor na instância

//Instanciando a classe, para que toda vez que ela for chamada crie uma nova conexão
//E passando para a classe que é um objeto os valores como, nome do banco, usuário, senha e um objeto de configuração
const sequelize = new Sequelize('toughts', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',//Tipo de banco
})
try{
    sequelize.authenticate()//Usando a função de conectar ao banco do objeto de conexão
    console.log('Conectamos ao banco')
}
catch(err){
    console.log(`Não foi possível conectar ${err}`)
}
module.exports = sequelize