const http = require('http')
const fs = require('fs')

const port = 3000//O usuário que acessar está porta irá receber as respostas que eu der para ele

//Método do http que cria um servidor
const server = http.createServer((req, res)=>{
    fs.readFile('message.html', function (err, data){//O módulo fs irá ler o arquivo message.html e irá criar uma função com os parâmetros de err e data(dados)
        res.writeHead(200, {'Content-type': 'text/html'})//Na resposta do servidor o corpo da resposta terá status 200 e o tipo de arquivo que terá dentro será text/html
        res.write(data)//Aqui foi escrito dentro da resposta(res) a data(dados que foram extraidos do arquivo message.html)
        return res.end()//Está retornando a resposta e dando um fim no código
    })
})

//É necessário que o servidor escute uma porta
//Depois da vírgula é uma função callback, que será chamada se tudo der certo na criação do servidor, assim saberemos se o servidor foi ligado ou não
server.listen(port, ()=>{
    console.log('Servidor rodando')
})