const conn = require('../db/conn')
const {ObjectId} = require('mongodb')

//Basicamente não criamos a tabela, mas criamos um modelo de objeto JavaScript a ser seguido para salvar no banco
class Product {//Criando a classe Product, ou seja, o modelo
    constructor(name,image,price,description){//E esta classe terá três parâmetros
        //E o está dizendo que cada parâmetro no document terá valor igual ao parâmetro do objeto criado
        //Ou seja, o name que está no document terá valor igual ao name que está no parâmetro
        this.name = name
        this.image = image
        this.price = price
        this.description = description
    }
    save(){
        //Salvando o dado, chamando a conexão com o método db, criando um collection e inserindo nesta collection os dados que vieram a partir do objeto
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        })
        return product
    }
    static getProducts(){
        const products = conn.db().collection('products').find().toArray()
        //Está fazendo um conexão com o banco de dados na collection products, buscando todos os dados e transformando os dados retornados em array
        return products//E retorna os dados que foram procurados para quem chamar essa função
    }
    static async getProductByid(id){
        //Está pegando um elemento da collection onde a chave _id for igual ao id que vai ser passado para essa função
        const product = await conn.db().collection('products').findOne({_id: new ObjectId(id)})
        //Esse ObjectId serve para realizar a comparação entre os id
        //Pois, no banco está assim "ObjectId('138290318128931')"
        //Então é necessário inserir esse ObjetctId

        return product
    }
    static async removeProductByid(id){

        await conn.db().collection('products').deleteOne({_id: new ObjectId(id)})
        
        return//Neste caso o return servirá somente para dizer que a função terminou
    }
    updateProduct(id){
        conn.db().collection('products').updateOne({_id: new ObjectId(id)}, {$set: this})//$set método que atualiza

        return
    }
}
module.exports = Product
//Instânciando a classe que acabei de fazer um modelo
//const product1 = new Product("Camiseta", 20.0, "Uma camiseta confortável de algodão.");