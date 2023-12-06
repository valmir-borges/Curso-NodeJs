const {MongoClient} = require('mongodb')//Classe responsável por conectar no banco

const uri = "mongodb://0.0.0.0:27017/testemongodb";//Url que é responsável pela conexão ao banco

const client = new MongoClient(uri)//instânciando o MongoClient passando a url de conexão, para que toda vez que ele for chamado seja criado uma nova conexão

async function run(){//Função responsável pela conexão ao banco
    try {
        await client.connect//Executando o método de conexão da variável instânciada
        console.log('Conectamos ao banco!')
    } catch (err) {
        console.log(err)
    }
}
run()//Executando a função
module.exports = client//Exportando a const de conexão