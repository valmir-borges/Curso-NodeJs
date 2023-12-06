const getToken = require("../helpers/get-token")
const getUserByToken = require('../helpers/get-user-by-token')
const Pet = require("../models/Pet")

module.exports = class PetController{
    static async create(req,res){//Criando um pet
        const {name,age,weight,color} = req.body
        const images = req.files
        const available = true//Deixando o pet disponível para a adoção

        //upload images

        //validations
        if(!name){
            res.status(422).json({message: "O nome é obrigatório!"})
        }
        if(!age){
            res.status(422).json({message: "A idade é obrigatória!"})
        }
        if(!weight){
            res.status(422).json({message: "O peso é obrigatório!"})
        }
        if(!color){
            res.status(422).json({message: "A cor é obrigatória!"})
        }
        if(images.length === 0){
            res.status(422).json({message: "A imagem é obrigatória!"})
        }
        //Pegando o dono do pet que está sendo cadastrado
        const token = getToken(req)//Pegando o token
        const user = await getUserByToken(token)//Dando o token para que ele encontre o nome do usuário 

        //criando um pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })
        images.map((image)=>{//Percorrendo o array de imagens, e cada item desse array será chamado de image
            pet.images.push(image.filename)//Colocando as imagens
        })
        try {
            const newPet = await pet.save()
            res.status(201).json({message: "Pet cadastrado com sucesso", newPet})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
    static async getAll(req,res){
        const pets = await Pet.find().sort('-createdAt')//Está buscando na tabela Pet todos os itens e ordenando a partir do createdAt

        res.status(200).json({
            pets: pets
        })
    }
    static async getAllUserPets(req,res){
        //pegando o token
        const token = getToken(req)//Pegando o token
        const user = await getUserByToken(token)//Pegando o usuário a partir do token

        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')//Filtrando

        res.status(200).json({
            pets: pets
        })
    }
}