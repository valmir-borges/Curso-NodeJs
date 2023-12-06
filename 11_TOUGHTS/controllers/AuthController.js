const User = require('../models/User')//Importanto a tabela usuário

const bcrypt = require('bcryptjs')//Importanto a biblioteca que criptografa e descriptografa a senha do usuário

module.exports = class AuthController{
    static login(req,res){
        res.render('auth/login')
    }
    static async loginPost(req,res){
        const {email, password} = req.body

        //Primeiro é necessário verificar se o usuário existe a patir do email
        const user = await User.findOne({where: {email: email}})//Verificando se há um email igual no banco

        if(!user){//Se a variável for retornada como vazia, quer dizer que o email está errado e não será possível fazer o login
            req.flash('message', 'Usário não encontrado!')//O primeiro valor é a chave e o segundo valor é a própria mensagem
            res.render('auth/login')

            return
        }

        //Segundo é necessário validar a senha do usuário
        const passwordMatch = bcrypt.compareSync(password, user.password)//O módulo bcrypt tem uma função que compara senhas
        //Portanto é necessário passar a senha que o usuário mandou e a senha que está salva no banco

        if(!passwordMatch){//Se for retornado como falso a comparação quer dizer que as senhas são diferentes
            req.flash('message', 'Senha inválida!')//O primeiro valor é a chave e o segundo valor é a própria mensagem
            res.render('auth/login')

            return
        }
        req.session.userid = user.id//Colocando o id do usuário na sessão dele

        req.flash('message', 'Autenticação realizada com sucesso')

        req.session.save(()=>{
            res.redirect('/')
        })
    }
    static register(req,res){
        res.render('auth/register')
    }
    static async registerPost(req,res){
        const {name,email,password,confirmpassword} = req.body//Pegando todas as informações do usuário de uma vez só e colocando em um objeto

        //validando a senha
        if(password != confirmpassword){//Se a senha for diferente da confirmação de senha, quer dezer que o usuário digitou errado
            //Envia uma mensagem para o usuário
            req.flash('message', 'As senhas não conferem, tente novamente!')//O primeiro valor é a chave e o segundo valor é a própria mensagem
            res.render('auth/register')

            return
        }
        //Validando se o usuário já existe a partir do email
        const checkifUserExist = await User.findOne({where: {email: email}})//Criando uma validação se o email já existe
        //Está buscando na tabela do banco de dados na coluna email algum dado que seja igual o email que foi passado no form

        if(checkifUserExist){//Se essa variável vier preenchida quer dizer que o email já existe
            req.flash('message', 'O email já está em uso!')//O primeiro valor é a chave e o segundo valor é a própria mensagem
            res.render('auth/register')

            return
        }
        //Criando a senha criptografada do usuário
        const salt = bcrypt.genSaltSync(10)//Criando um salt, basicamente 10 caracteres aleatórios
        const hashedPassword = bcrypt.hashSync(password, salt)//Unindo a senha do usuário ao salt

        const user = {
            name,
            email,
            password: hashedPassword//Manda a senha criptografada e não a senha cru
        }
        try {
            const createdUser = await User.create(user)//Foi colocado em uma const, pois é necessário pegar o id do usuário cadastrado
            //É o próprio banco que coloca o id, então é necessário esperar o banco retornar todos os dados do usuário

            //Fazendo com que quando o usuário se registrar ele automaticamente loga
            //Toda requisição do usuário tem uma session com um userid, porém começa como nulo e depois de lugar esse userid é substituido pelo o id do usuário no banco
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(()=>{
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static logout (req,res){
        req.session.destroy()//Quando o usuário clicar em logout a req do usuário terá uma session, e essa session será destruída
        res.redirect('/login')
    }
}