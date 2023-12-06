const http = require('http')

const port = 3000//O usuário que acessar está porta irá receber as respostas que eu der para ele

//Método do http que cria um servidor
const server = http.createServer((req, res)=>{//Será criado um servidor com os parâmetros de requisição e a resposta, pois é a partir dela que uma decisão sera tomada
    res.statusCode = 200//A resposta terá status de 200, ou seja, foi sucedida
    res.setHeader('Content-type' , 'text/html')//A resposta terá seu corpo do tipo texto html
    res.end('<h1>Salve dog<h1/><p> Ayel rei dos dogs<p/>')//O método end aceita tags html
})

//É necessário que o servidor escute uma porta
//Depois da vírgula é uma função callback, que será chamada se tudo der certo na criação do servidor, assim saberemos se o servidor foi ligado ou não
server.listen(port, ()=>{
    console.log('Servidor rodando')
})