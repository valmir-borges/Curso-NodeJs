//Srquivo para verificar a autenticação do usuário e liberar ele para acessar uma página
module.exports.checkAuth = function(req,res,next){
    const userId = req.session.userid//Pegando o id da sessão do usuário

    if(!userId){//Se não tiver nada na sessão do usuário quer dizer que ele está deslogado
        res.redirect('/login')
    }
    next()//Prossegue a aplicação
}
