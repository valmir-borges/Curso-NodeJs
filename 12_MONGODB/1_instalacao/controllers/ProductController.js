const Product = require('../models/Product')

module.exports = class ProductController{
    static async showProducts (req,res){
        const products = await Product.getProducts()//Está executando uma função do models
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

        const product = new Product(name,image,price,description)//Inserindo os dados que veio da requisição em um novo objeto Product, pois ele já está montado, falta so colocar os valores

        await product.save()//Salvando no banco

        res.render('products/all')
    }
    static async getProduct(req,res){
        const id = req.params.id

        const product = await Product.getProductByid(id)
        //Executando a função de pegar um dado no banco, passando para essa função o id que veio pelo parâmetro

        res.render('products/product', {product:product})
    }
    static async removeProduct(req,res){
        const id = req.params.id

        await Product.removeProductByid(id)
        
        res.render('products/all')
    }
    static async editProduct(req,res){
        const id = req.params.id

        const product = await Product.getProductByid(id)

        res.render('products/edit', {product:product})
    }
    static async editProductPost(req,res){
        const id = req.body.id
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description

        const product = new Product(name,image,price,description)

        //Como está sendo criado um novo construtor inteiro ele já vai levar com ele todas as funções
        //Pois na models quando é criado um novo objeto Product ele leva com ele além dos parâmetros as funções
        //Portanto é possível executar a função a partir dele mesmo
        await product.updateProduct(id)

        res.render('products/all')
    }
}