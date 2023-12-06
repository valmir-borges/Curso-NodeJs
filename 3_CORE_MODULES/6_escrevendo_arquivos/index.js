const http = require('http')
const fs = require('fs')

const port = 3000//O usuário que acessar está porta irá receber as respostas que eu der para ele

//Método do http que cria um servidor
const server = http.createServer((req, res)=>{
    //Basicamente quando usa esse módulo core de url ele pega a url que o usuário está quando abre a página
    const urlinfo = require('url').parse(req.url, true)//Foi dado um parse(dividiu) na url do usuário, dividindo ela
    const name = urlinfo.query.name//Está sendo pegado da urlinfo somente o nome, que virá do arquivo html
            if(!name){//Se name não existir, ou seja, não foi feito nenhum cadastro de nome
            fs.readFile('index.html', function (err, data){//O modulo fs irá ler o index.html e irá retornar todo o index.html no parâmetro data como res
                res.writeHead(200, {'Content-type': 'text/html'})//O corpo da res terá status 200 e o tipo de arquivo será text/html
                res.write(data)//A res será escrita pelo o que tiver dentro de data(arquivos do index.html) que é o que foi retornado pelo readfile
                return res.end()//Foi finalizado a função
            })
        }
        else{//Se name existir, ou seja, acabou de ser criado um nome
            fs.writeFile('arquivo.txt', name, function(err, data){//O modulo fs irá criar um arquivo chamado texto.txt, com o name dentro e retornando uma função
                //Importante lembrar que ele sempre excluirá o arquivo se ja existir e criar outro
                res.writeHead(302,{//O corpo da resposta terá status 302 e após o clique de enviar os dados será mandado novamente para a tela de index.html
                    location:'/'
                })
                return res.end()
            })
        }

})

//É necessário que o servidor escute uma porta
//Depois da vírgula é uma função callback, que será chamada se tudo der certo na criação do servidor, assim saberemos se o servidor foi ligado ou não
server.listen(port, ()=>{
    console.log('Servidor rodando')
})