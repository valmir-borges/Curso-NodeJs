//Função de criar o token para manter a conexão do usuário
const jwt = require('jsonwebtoken')

const createUserToken = async (user,req,res)=>{
    //Criando o token
    const token = jwt.sign({//Para ser criado o token é necessário mandar alguns metadados
        name: user.name,
        id: user._id
    }, "nossosecret")//Scret é para deixar o token seguro, pois se não qualquer um podia descriptografar o token
    //Retornando o token
    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id,
    })
}

module.exports = createUserToken