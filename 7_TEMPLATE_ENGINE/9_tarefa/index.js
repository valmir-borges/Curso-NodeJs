const express = require('express')
const exphbs = require('express-handlebars')

const app = express()//Iniciando o express na const app

//Configurando o handlebars para o uso de partials
const hbs = exphbs.create({//Tem um método dentro do express-handlebars que configura o uso do partials
    //Indicando onde fica o diretório dos partiasl
    partialsDir: ['views/partials']
})

//Definindo o handlebars como template engine
//Quanto as diferentes páginas são renderizadas a partir do app.get, eles serão renderizadas dentro do arquivo main que está dentro de layout
//Não é preciso dizer a onde está esse arquivo e qual seu nome, pois por padrão o handlebars já sabe que tem que procurar o arquivo de molde nesse diretório views/layouts/main.
app.engine('handlebars', hbs.engine)

//Está setando as view do engine como handlebars
app.set('view engine', 'handlebars')

//Definindo onde o handlebars irá pegar os arquivos estáticos
app.use(express.static('public'))

//Criando os produtos fora de cada chamada de req ou res, para que seja acessível em ambas as páginas, para que posteriormente seja passado um filtro
const products = [
    {
        id: 0,
        name:'Bola',
        category:'Brinquedos',
        preco:15.99
    },
    {
        id: 1,
        name:'Panela',
        category:'Utensílios',
        preco:49.99
    },
    {
        id: 2,
        name:'Mouse',
        category:'Informática',
        preco: 29.90
    },
]

app.get('/:id', (req,res) =>{
    //O usuário clicou no link de ver mais detalhes esse link é uma url que tem o id respectivo ao produto, esse clique será um requisição que irá cair aqui
    //O :id é o id do produto
    const product = products[req.params.id]//Será pegado o objeto que tiver id igual ao que foi passado no parâmetro
    res.render('produto', {product})
})

app.get('/', (req,res)=>{
    res.render('home', {products:products})
})

app.listen(3000, (req,res)=>{
    console.log("Servidor rodando")
})