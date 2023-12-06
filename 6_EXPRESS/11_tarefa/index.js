const express = require('express')
const app = express()
const port = 5000
const path = require('path')

const router = require('./rotas')//Pegando nosso arquivo que contém as rotas

const basePath = path.join(__dirname, './templates')//Pegando a pasta que contém nossos html

app.use(express.static('./public'))//As coisas státicas, como css e imagens, o express irá pegar da pasta public

//Toda rota que tiver /champions o express irá chamar a const router que contém o meu arquivo com cada rota que virá depois do /champions
app.use('/champions', router)

//Quando o usuário acessar a página home (localhost:5000/) será mandada para ele o html da home
app.get('/', (req,res)=>{
    res.sendFile(`${basePath}/Home.html`)
})






app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})