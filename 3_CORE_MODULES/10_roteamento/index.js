const http = require('http')
const fs = require('fs')
const url = require('url')
const port = 3000//O usuário que acessar está porta irá receber as respostas que eu der para ele

//Método do http que cria um servidor
const server = http.createServer((req, res)=>{

    //Basicamente quando usa esse módulo core de url ele pega a url que o usuário está quando abre a página
    const q = url.parse(req.url, true)//Está partindo a url do usuário que vem a partir da requisição e colocando dentro de q
    
    //Sabendo a url que foi acessada a partir do pathname
    const fillename = q.pathname.substring(1)//A url está dividida em vários pedaços e quero pegar somente a que tiver como parâmetro pathname, a partir do caracter 1
    //Pois o primeiro (0) é o barra (/index.html)

            if(fillename.includes('html')){//Se o fillename possuir html na url, quer dizer que pode ser renderizado
                if(fs.existsSync(fillename)){//Está verificando se esse arquivo existe em nossa aplicação
                    //Função síncrona, pois o sistema irá esperar o arquivo ser verificado para prosseguir

                    //Se ele de fato existir o fillname será renderizado
                    //O fillename pode conter (index.html, contato.html)
                    fs.readFile(fillename, function (err, data){//O modulo fs irá ler o index.html e irá retornar todo o index.html no parâmetro data como res
                        res.writeHead(200, {'Content-type': 'text/html'})//O corpo da res terá status 200 e o tipo de arquivo será text/html
                        res.write(data)//A res será escrita pelo o que tiver dentro de data(arquivos do index.html) que é o que foi retornado pelo readfile
                        return res.end()//Foi finalizado a função
                    })
                }
                else{//Se o arquivo não existir será mostrado uma página de erro 404
                    fs.readFile('404.html', function (err, data){//O modulo fs irá ler o index.html e irá retornar todo o index.html no parâmetro data como res
                        res.writeHead(404, {'Content-type': 'text/html'})//O corpo da res terá status 200 e o tipo de arquivo será text/html
                        res.write(data)//A res será escrita pelo o que tiver dentro de data(arquivos do index.html) que é o que foi retornado pelo readfile
                        return res.end()//Foi finalizado a função
                    })
                }
        }
})

//É necessário que o servidor escute uma porta
//Depois da vírgula é uma função callback, que será chamada se tudo der certo na criação do servidor, assim saberemos se o servidor foi ligado ou não
server.listen(port, ()=>{
    console.log('Servidor rodando')
})