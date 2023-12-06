const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')//Importanto a conexão com o banco
const User = require ('./models/User')
const Adress = require('./models/Adress')
const app = express()

//Configurando para pegar os dados do formulário em json
//Configurando o corpo de toda requisição do formulário
app.use(//Basicamente falou para o express utilizar a biblioteca qs, que permite a transformação de algo em json
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())//Agora toda requisição será transformada em objeto json {name: "valmir"}

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get('/users/create', (req, res)=>{
    res.render('adduser')
})

//Detalhes de 1 usuário
app.get('/users/:id', async (req,res)=>{
    const id = req.params.id

    //Está procurando um elemento na tabela User onde o id do elemento for igual ao id que foi recebido na requisição
    const user = await User.findOne({raw: true, where: {id:id }})
    //Importante sempre passar o raw como true

    res.render('userview', {user:user})
})

app.post('/users/create', async (req,res)=>{//Será uma função assíncrona
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter//É uma variável, pois queremos mudar o valor dela dependendo de algo
    //Se o usuário marca o input a req vem como 'on', se não marca aparece nada sobre o newsletter

    if(newsletter === 'on'){
        newsletter = true//Se o campo vier marcado ele vem como on, ou seja, true
    }
    else{
        newsletter = false
    }

    //Método create que cria os usuários nessa tabela, passando como objeto os dados a serem inseridos na tabela
    await User.create({name, occupation, newsletter})
    //E terá um await para esperar a criação do usuário para redirecionar
    res.redirect('/')
})

//Deletando
app.post('/users/delete/:id', async (req,res)=>{
    const id = req.params.id

    //Não é necessário colocar a query em uma variável, pois não irá mandar essa variável para o front, é só uma query para deletar
    await User.destroy({where: {id:id}})

    res.redirect('/')
})

//Pegando os dados no form do edit, somente pegando
app.get('/users/edit/:id', async (req,res)=>{
    const id = req.params.id

    //Além de pegar o usuário esta pegando todos os endereços relacionados a esse id que foi passado
    const user = await User.findOne({include: Adress, where: {id:id}})
    res.render('edit', {user:user.get({plain:true})})//Como tiramos o raw, os dados estão vindo como um objeto complexo, portanto é necessário transforma-los a aprtir do plain
    //E na tela do handlebars basta criar um each, ou seja, um loop acessando o user.Adressees
})

//Atualizando de fato os dados
app.post('/users/update', async (req,res)=>{
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter//É uma variável, pois queremos mudar o valor dela dependendo de algo
    //Se o usuário marca o input a req vem como 'on', se não marca aparece nada sobre o newsletter

    if(newsletter === 'on'){
        newsletter = true//Se o campo vier marcado ele vem como on, ou seja, true
    }
    else{
        newsletter = false
    }
    //Colocando todos os dados do update em um objeto para não precisar passar cada dado pela query
    const userData = {
        id,
        name,
        occupation,
        newsletter
    }
    //Mandando a query de update, com ela vai os dados atulizados e a condição para atulizar, que é ter o mesmo id
    await User.update(userData, {where: {id:id}})
    res.redirect('/')
})
//Cadastrando o endereço
app.post('/adress/create', async (req,res)=>{
    //Pegando os dados do form, e o id do usuário que está sendo adicionado um endereço
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    //Compactando os dados para inserir na tabela, e não ter que passar eles um a um
    //Importante lembrar que é necessário passar os nomes da const igual o da coluna
    const adreesData = {
        UserId,
        street,
        number,
        city
    }
    await Adress.create(adreesData)

    res.redirect(`/users/edit/${UserId}`)//Recarregando a página na tela do usuário que está sendo editado
})
//Exluindo um dado relacionado
app.post('/adrees/delete', async (req,res)=>{
    const UserId = req.body.UserId
    const id = req.body.id

    await Adress.destroy({where: {id:id}})

    res.redirect(`/users/edit/${UserId}`)})

app.get('/', async (req,res)=>{

    const users = await User.findAll({raw:true})//Está lendo todos os dados da tabela Users, o raw = true, serve para que os dados da leitura sejam transformados em um array

    res.render('home', {users:users})
})

//Foi chamado a conexão com o banco com o método sync, que cria a tabela quando precisa
conn
.sync()
//.sync({force: true})//Isso reseta a tabela quando toda vez que for dado o npm start
.then(()=>{
    app.listen(3000)
})
.catch((err)=>console.log(err))

