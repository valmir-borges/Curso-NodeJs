const http = require('http')

const port = 3000//O usuário que acessar está porta irá receber as respostas que eu der para ele

//Método do http que cria um servidor
const server = http.createServer((req, res)=>{//Será criado um servidor com os parâmetros de requisição e a resposta, pois é a partir dela que uma decisão sera tomada
    //Estamos pegando a url que vem a partir da requisição
    //Essa requisição é mandada para cá quando o usuário abre a página, ou seja, vem uma requisição com um monte de coisa, porém pegamos da requisição somente a url
    //E partimos (parse) a requisição, fazendo com que haja pedaços dela
    //O true é só para o código funcionar
    const urlinfo =  require('url').parse(req.url, true)

    //Está pegando a urlinfo que vem decomposta e pegando o parâmetro name
    const name = urlinfo.query.name

    res.statusCode = 200//A resposta terá status de 200, ou seja, foi sucedida
    res.setHeader('Content-type' , 'text/html')//A resposta terá seu corpo do tipo texto html
    if(!name){//Se não existir o name na url ele irá exibir um h1, form e input
        res.end('<h1>Preencha seu nome<h1/><form method="GET"><input type="text" name="name"/><input type="submit" value="enviar"/><form/>')
    }
    else{//Se existir na url será exibido
        res.end(`Olá ${name}`)
    }
})

//É necessário que o servidor escute uma porta
//Depois da vírgula é uma função callback, que será chamada se tudo der certo na criação do servidor, assim saberemos se o servidor foi ligado ou não
server.listen(port, ()=>{
    console.log('Servidor rodando')
})