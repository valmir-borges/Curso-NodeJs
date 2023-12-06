const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require ('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const coon = require('./db/conn')
//Chamando o Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

//Chamando os Models
const Tought = require('./models/Tought')
const User = require('./models/User')

//Chamando o Controller
const ToughtController = require('./controllers/ToughtController')

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//receber resposta do body
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//salvando as seções do usuário
app.use(session({//Configurando a session
    name: 'session',
    secret: 'nosso_secret',
    resave: false,//Caiu a conexão ele irá desconectar
    saveUninitialized: false,
    //Local que será salvo a session do usuário
    store: new FileStore({//Instânciando a classe, pois terá várias sessões rodando a mesmo momento, portanto é necessário instânciar para pegar as configurações do objeto pai
        //E criar vários objetos filhos
        logFn: function() {},
        //Local que será salvo
        path: require('path').join(require('os').tmpdir(),'session')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,//Tempo de duração do cookie, após esse tempo ele se torna inválido
        expires: new Date(Date.now()+ 360000),//Forçando a expiração após esse tempo, ou seja, deletando ele
        httpOnly: true
    }
}))

//Mensagens na tela do usuário, feedback do banco de dados para o usuário
app.use(flash())//Toda requisição do usuário agora irá ter um objeto chamado message, se der algum erro será inserido dentro desse objeto outro objeto chamado mensagem
//Se a message possuir a mensagem será exibido uma flash message

app.use(express.static('public'))

//Configurando a resposta para que nela haja uma session.
//Dando andamento para a aplicação dependendo da session
app.use((req,res,next)=>{
    if(req.session.userid){//Se na requisição do usuário existir uma session com um id, ou seja, ele está logado
        res.locals.session = req.session//A resposta do servidor terá a mesma session que veio na requisição, assim é possível pegar os dados do usuário
    }
    //Se ele não estiver logado ou estiver irá prosseguir a aplicação
    next()
})
//Routes
//A requisição do usuário que tiver /toughts será mandada para esse arquivo de rotas
app.use('/toughts', toughtsRoutes)

app.use('/', authRoutes)

//Acessando a home fora do /toughts
//Essa requisição localhost:3000/toughts/
//E essa requisição localhost:3000/
//Irá renderizar a mesma página
app.get('/', ToughtController.showToughts)

coon.sync()//A conexão com o banco é uma promisse
    .then(()=>{//Então se deu certo a conexão a aplicação irá escutar a porta 3000
        app.listen(3000)
    })
    .catch((err)=>{
        console.log(err)
    })