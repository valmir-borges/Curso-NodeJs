const {Sequelize} = require('sequelize')//Importando o objeto da conexão com o banco, em que cada chave receberá o valor na instância

//Instanciando a classe, para que toda vez que ela for chamada crie uma nova conexão
//E passando para a classe que é um objeto os valores como, nome do banco, usuário, senha e um objeto de configuração
const sequelize = new Sequelize('nodesequelize', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',//Tipo de banco
})

//Após a tentativa de conectar com o banco ele irá cair aqui
try{
    sequelize.authenticate()//Verificando se foi conectado com o banco
    console.log('Conectamos ao banco com sucesso')
}
catch(error){
    console.log(`Não foi possível concectar ao banco: ${error}`)
}

module.exports = sequelize