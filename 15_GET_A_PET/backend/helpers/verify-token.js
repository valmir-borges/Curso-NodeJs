const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

const checkToken = (req,res, next)=>{
    if(!req.headers.authorization){//Checkando se vem algo no headers.authorization, se não vier quer dizer que o usuário não está logado
        return res.status(401).json({message: "Acesso negado"})
    }
    const token = getToken(req)//Função que pega as informações do usuário a partir do token
    if(!token){//Se não retornar nada quer dizer que não tem um token, ou seja, acesso negado
        return res.status(401).json({message: "Acesso negado"})
    }
    try {
        //Verificando o token
        const verified = jwt.verify(token, "nossosecret")//Pegando as informações do token do usuário
        req.user = verified//Colocando as informações do usuário no req.user
        next()//Prosseguindo a aplicação se der certo
    } catch (error) {
        return res.status(400).json({message: "Token inválido"})
    }
}

module.exports = checkToken