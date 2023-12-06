const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Helpers
const createUserToken = require('../helpers/Create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController{
    static async register(req,res){
        //Pegando todos os campos do formulário
        const {name, email, phone, password, confirmpassword} = req.body
        //Campo de confirmpassword não está na models, mas será enviado pelo body para ver se está correto as senhas

        //Validações

        //Se algum campo não vier, dará um erro
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório!'})
            return
        }
        if(!email){
            res.status(422).json({message: 'O email é obrigatório!'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório!'})
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória!'})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatória!'})
            return
        }

        //Validando as senhas
        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais!'})
            return
        }

        //Checkando se o usuário já existe
        const userExist = await User.findOne({email:email})//Está buscando no banco de dados se já existe o email que está sendo cadastrado
        if(userExist){//Se a variável vier preenchida que dizer que já existe
            res.status(422).json({message: 'Por favor, utilize outro email!'})
            return
        }
        
        //Criptografando senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //Salvando o usuário no banco
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash,
        })
        try {
            const newUser = await user.save()
            await createUserToken(newUser, res,res)//Chamando a função de criar o token, passando o usuário, e a req/res para ele terminar
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
    static async login(req,res){
        const {email, password} = req.body
        if(!email){
            res.status(422).json({message: 'O email é obrigatório!'})
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória!'})
            return
        }
        //Checkando se o usuário já existe
        const user = await User.findOne({email:email})//Está buscando no banco de dados se existe um usuário com aquele email
        if(!user){//Se a variável vier preenchida que dizer que já existe
            res.status(422).json({message: 'Não há usuário cadastrado com este email!'})
            return
        }
        //Checkando a senha do usuário
        const checkPassword = await bcrypt.compare(password, user.password)//Comparando a senha que veio pelo formulário com a senha que foi pega quando foi validar o usuário
        if(!checkPassword){//Se retornar inválido
            res.status(422).json({message: 'Senha inválida'})
            return
        }
        await createUserToken(user, res,res)//Chamando a função de criar o token, passando o usuário, e a req/res para ele terminar
    }
    static async checkUser(req,res){//Verificando o usuário pelo Token
        let currentUser//Variável não definida

        if(req.headers.authorization){//O token fica no authorization
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')//Decodificando o token, passando o token que vai ser decodificado e o secret

            currentUser = await User.findById(decoded.id)//Pegando as informações do usuário daquele token, o token carrega com ele o id do usuário
            currentUser.password = null//Tirando senha que foi pega quando foi buscado o usuário, pois não é necessário
        }
        else{//Se não vier nada no authorization quer dizer que o usuário não existe
            currentUser=null
        }
        res.status(200).send(currentUser)
    }
    static async getUserById(req,res){//Essa função é para exibir o usuário na tela de edição
        const id = req.params.id
        //Pegando o usuário pela url dinâmica
        const user = await User.findById(id).select('-password')//O select é para tirar o campo password, ou seja, menos o campo password
        if (!user){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }
        res.status(200).json({user})
    }
    static async editUser(req,res){//Essa função é para postar a alteração       
        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name,email,phone,password,confirmpassword} = req.body

        let image = ''
        if(req.file){//Os arquivos vem pelo file da requisição
            user.image = req.file.filename
        }

        //Se algum campo não vier, dará um erro
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório!'})
            return
                }
        if(!email){
            res.status(422).json({message: 'O email é obrigatório!'})
            return
        }
        const userExist = await User.findOne({email:email})//Verificando se aquele email já existe
        if(user.email !== email && userExist){//Se o email que o usuário digitou for diferente que o email que foi buscado a partir do id e ao mesmo tempo esse email já estiver salvo no banco, quer dizer que esse email ja está em uso
            res.status(422).json({message: 'Por favor utilize outro email!'})
            return
        }   
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório!'})
            return
        }
        user.phone = phone
        //Se caso o usuário quiser mudar de senha
        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais!'})
            return
        }
        else if (password === confirmpassword && password != null)//O usuário mandou uma senha igual nos dois campos, ou seja, ele quer alterar a senha dele
        {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }
        //Se ele não quiser mudar de senha
        try {//Está buscando e atualizando no banco de dados, o usuário com o id que será passado, e setando nesse usuário que vai ser atualizado os dados que foram alterados
            await User.findOneAndUpdate({_id: user.id},{$set:user}, {new: true})
            res.status(200).json({message: "Usuário atualizado com sucesso"})
        } catch (error) {
            res.status(500).json({message: error})
            return
        }
    }
}