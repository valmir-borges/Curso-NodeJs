const Product = require('../models/Product')

module.exports = class ProductController{
    static async showProducts (req,res){
    const products = await Product.find().lean()//Está executando a função do mongoose chamada find, ela irá procurar tudo que estiver no db
    //A função lean, serve para dar suporte ao handlebars e fazer o loop para a impressão

    res.render('products/all',{products:products})
    }
    static createProducts(req,res){
        res.render('products/create')
    }
    static async createProductsPost(req,res){
        const name= req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description

        const product = new Product({name,image,price,description})//Inserindo os dados que veio da requisição em um novo objeto Product, pois ele já está montado, falta so colocar os valores
        //Usando o mongoose é necessário colocar os dados em um objeto

        await product.save()//Salvando no banco e a função save é própria do mongoose

        res.render('products/all')
    }
     static async getProduct(req,res){
        const id = req.params.id

        const product = await Product.findById(id).lean()
        //Executando a função de pegar um dado no banco, a partir do mongoose

        res.render('products/product', {product:product})
     }
    static async removeProduct(req,res){
        const id = req.params.id

        await Product.deleteOne({_id: id})
        
        res.render('products/all')
    }
    static async editProduct(req,res){
        const id = req.params.id

        const product = await Product.findById(id).lean()

        res.render('products/edit', {product:product})
    }
    static async editProductPost(req,res){
        const id = req.body.id
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description

        const product = {name,image,price,description}//Colocando em um objeto, pois o mongoose trabalha com inserção de dados a partir de objetos

         await Product.updateOne({_id: id}, product)

         res.render('products/all')
    }
}