const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')//Importanto a conexão com o banco
const app = express()

//Configurando para pegar os dados do formulário em json
//Configurando o corpo de toda requisição do formulário
app.use(//Basicamente falou para o express utilizar a biblioteca qs, que permite a transformação de algo em json
    express.urlencoded({
        extended: true,
    }),
)
const Task = require('./models/Task')//Importando a tabela

const taskRoutes = require('./routes/taskRoutes')
//Toda url que tiver /task será mandada para nosso arquivo de rotas das task
//E e nele irá ser feito a escolha de qual método do controller será executado
app.use('/tasks', taskRoutes)

app.use(express.json())//Agora toda requisição será transformada em objeto json {name: "valmir"}

app.engine('handlebars', exphbs.engine())//Indicando qual é a template engine utilizada

app.set('view engine', 'handlebars')

app.use(express.static('public'))

conn.sync()//Esse sync basicamente verifica se todas as tabelas do model está batendo com a do banco e se faltar alguma ele cria
    .then(()=>{
        app.listen(3000)
    })
    .catch((err)=>{
        console.log(err)
    })
