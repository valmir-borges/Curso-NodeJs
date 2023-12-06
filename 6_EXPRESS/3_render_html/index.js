const express = require('express')
const app = express()//Executando o módulo express em forma de função
const port = 3000// Dando a porta para que usuário acesse
const path = require('path')

//Utilizando o path para pegar o caminho até o arquivo html
//Método join, pois nós mesmos vamos criar o path (caminho) até o arquivo html
//__dirname = assim o path irá partir do diretório que ele está
const basePath = path.join(__dirname, 'templates')


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