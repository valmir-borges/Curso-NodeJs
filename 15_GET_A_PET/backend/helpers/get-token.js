const getToken = (req)=>{
    //Extraindo do token somente a string
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]//Separando o token quando tiver um espaço, pois ele de maneira crua é assim "Bearer (token)", então é necessário separar e irá pegar a segunda aprte
    return token
}

module.exports = getToken