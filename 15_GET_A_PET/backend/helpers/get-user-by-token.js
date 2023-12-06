const jwt = require('jsonwebtoken')

const User = require('../models/User')

//Pegando o usuário pelo token
const getUserByToken = async (token)=>{
    if(!token){//Se não retornar nada quer dizer que não tem um token, ou seja, acesso negado
        return res.status(401).json({message: "Acesso negado"})
    }
    const decoded = jwt.verify(token, "nossosecret");//Pegando todas as informações do usuário pelo token
    const userId = decoded.id//Pegando id

    const user = await User.findOne({_id: userId})//Pegando o usuário

    return user

}
module.exports = getUserByToken