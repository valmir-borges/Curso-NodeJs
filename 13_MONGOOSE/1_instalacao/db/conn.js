const mongoose = require ('mongoose')

async function main(){
    await mongoose.connect('mongodb://0.0.0.0:27017/testemongoose')//Executando a função de conecção com o banco e dando a string de conexão
    console.log('Conectamos ao MongoDB com o Mongoose')
}
main()//Executando a função
.catch((err)=> console.log(err))//E se der algum erro

module.exports = mongoose//Exportando o mongoose