const express = require('express')
const app = express()//Executando o módulo express em forma de função
const port = 3000// Dando a porta para que usuário acesse
const path = require('path')

const users = require('./users')//Importamos o router

//Utilizando o path para pegar o caminho até o arquivo html
//Método join, pois nós mesmos vamos criar o path (caminho) até o arquivo html
//__dirname = assim o path irá partir do diretório que ele está
const basePath = path.join(__dirname, './templates')

//Configurando o copor da requisição do formulário
app.use(//Basicamente falou para o express utilizar a biblioteca qs, que permite a transformação de algo em json
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())//Agora toda requisição será transformada em objeto json {name: "valmir"}

app.use(express.static('public'))

//O router é um gerenciador das rotas
//Toda url que o usuário acessar e tiver /users nela o express irá chamar o usersRouter(meu arquivo que contem as rotas)
//E no meu arquivo tem cada coisa que será feita de acordo com a rota
app.use('/users', users)

//O get nessa aplicação só está sendo usuado para exibir páginas
//Pegando a função do express chamada de get
//Ela é um verbo http, que basicamente será usado para que o usuário visualize a página
//O ato de um usuário acessar a nossa url já é uma requisição
//Primeiro argumento será a rota que o usuário irá acessar, / = localhost, ou seja, a url default
app.get('/', (req, res)=>{//O segundo argumento será a requisição do usuário e a nossa resposta
    //Req = tudo que o usuário mandar para nós
    //Res= tudo que nós mandar para o usuário
    res.sendFile(`${basePath}/index.html`)//sendFile = enviar um arquivo para a resposta
})
//É necessário ter a função anônima para que possamos dar um fim na requisição do usuário, ou seja, o que será feito quando o usuário mandar a requisição?(nesse caso quando acessar a página)

//O express necessita escutar uma porta
//O primeiro argumento é a porta em si, que neste caso está na variável port
//O segundo é uma callback = função anônima
//Quando o servidor for "ligado" (node ./index.js) o express irá escutar esta porta e dar um console.log
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})