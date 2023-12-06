const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')//Agora toda vez que for mandada uma query será utilizado o pool, ao invés da const conexão

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

//O express irá inserir (post) um dado no banco quando a requisição do usuário tiver essa url
app.post('/books/insert', (req, res)=>{
    const title = req.body.title//Está pegando do corpo da requisão que está em json o valor da chave title
    const pageqty = req.body.pageqty

    const querybook = `INSERT INTO books (??, ??) VALUES (?,?)`
    //Para proteger a nossa query é necessário colocar interrogações principalmente nos valores das variáveis, mas também no nome das colunas

    //Para a query saber o que vai em cada interrogação é necessário enviar junto com a query um array com os dados
    const data = ['title', 'pageqty', title, pageqty]
    //Nas 2 primeiras interrogação vai ser o nome da coluna title, na segunda 2 interrogação nome da coluna pagqty
    //Nas 2 ultimas nossos dados


    //Conexao é a minha variavel que contém todos os dados para concetar ao banco, portanto será ela que irá mandar a query
    //E manda junto com a query o array data
    pool.query(querybook, data , function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/books') //Redirecionando para a home
    })
})
//Pegando um dado específico no banco a partir de um filtro WHERE
app.get('/books/:id', (req,res)=>{
    const id = req.params.id//Está pegando o id do livro que está vindo pela url, apartir do clique do usuário no titulo do livro

    const querybooksfilter = `SELECT * FROM books WHERE ?? = ?`

    const data = ['id', id]
    //Selecione todos os elementos da tabela books onde (where) o id que estiver na tabela for igual ao id da const

    pool.query(querybooksfilter, data, function(err, data){
        if(err){
            console.log(err)
        }
        //A const books vai ser igual ao índice 0 do array, pois é o primeiro elemento que queremos pegar, pois o id é único, ou seja, o primeiro
        const book = data[0]
        res.render('book', {book:book})
    })
})

//Editando um livro, dividido em duas partes, a primeiro pegar o item do banco de colocar na tela do usuário e a segunda de fato postar a edição no banco
app.get('/books/edit/:id', (req,res)=>{
    const id = req.params.id

    //Primeiro é necessário pegar o item do banco que irá ser editado
    const querybookseditar = `SELECT * FROM books WHERE ?? = ?`

    const data = ['id', id]
    pool.query(querybookseditar, data, function(err,data){
        if(err){
            console.log(err)
        }
        const book = data[0]
        //Para exibir as informações do livro nos inputs da edição tem que mandar os dados do livro para o form e o value de cada input ser igual ao o que estiver na const
        res.render('edit', {book:book})
    })

})
//Inserindo de fato a atualização no banco pelo método post
app.post('/books/update', (req,res)=>{
    //Pegando todas as infos da atualização do livro a partir do clique do formulário que é um requisição
    //Isto é possível em decorrência do name do input
    const title = req.body.title
    const pageqty = req.body.pageqty
    const id = req.body.id//O id não foi alterado e nem vai ser, pois ele está em um input invisível, porém ele é necessário para encontrar o livro no banco que será atualizado

    const queryupdate = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    //Está pedindo para a query realizar um update na tabela books, setando nas colunas de title o valor title e na coluna pageqty o valor pageqty, onde for encontrado um dado com id igual a id
    
    const data = ['title', title, 'pageqty', pageqty, 'id', id]

    pool.query(queryupdate, data, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.get('/', (req, res)=>{
    res.render('home')
})

//Resgatando dados
app.get('/books', (req,res)=>{
    //Essa query está resgatando(SELECT), selecionando todas as colunas dos books e trazendo para dentro dela
    const resgatequery = 'SELECT * FROM books'
    
    //Mandando essa query para o banco para que ela pegue todos os dados do banco
    pool.query(resgatequery, function(err, data){
        if(err){
            console.log(err)
        }
        //Os dados que ele pegar vai ser colocado dentro da constlivrosdobanco
        const livrosdobanco = data

        res.render('books', {livrosdobanco:livrosdobanco})
    })
})

//Deletando um livro
app.post('/books/delete/:id', (req,res)=>{
    const id = req.params.id

    const querydelete = `DELETE FROM books WHERE ?? = ?`

    const data = ['id', id]

    //Delete da tabela books o dado onde o id for igual ao id

    pool.query(querydelete, data, function(err){
        if(err){
            console.log(err)
        }
    res.redirect('/books')
    })
})
app.listen(3000)
