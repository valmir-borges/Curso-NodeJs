const {Sequelize} = require('sequelize')//Importando o objeto da conexão com o banco, em que cada chave receberá o valor na instância

//Instanciando a classe
//E passando para a classe que é um objeto os valores como, nome do banco, usuário, senha e um objeto de configuração
const sequelize = new Sequelize('nodesequelize', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
})

//Após a tentativa de conectar com o banco ele irá cair aqui
try{
    sequelize.authenticate()//Verificando se foi conectado com o banco
    console.log('Conectamos ao banco com sucesso')
}
catch(err){
    console.log('Não foi possível concectar ao banco: ', err)
}

module.exports = sequelize