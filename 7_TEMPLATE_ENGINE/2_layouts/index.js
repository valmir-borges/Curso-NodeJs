const express = require('express')
const exphbs = require('express-handlebars')

const app = express()//Iniciando o express na const app

//Definindo o handlebars como template engine
app.engine('handlebars', exphbs.engine())

//Está setando as view do engine como handlebars
app.set('view engine', 'handlebars')


app.get('/', (req,res)=>{
    res.render('home')//Agora é usado o render ao invés do sendFile
    //A página home contém somente o miolo do site (body)
    //Porém já vem configurado do handlebars que ele irá procurar uma pasta chamada views dentro dela layouts e um arquivo chamado main.handlebars
    //Esete arquivo irá conter o layout base da página que só será alterado seu conteudo 
})

app.listen(3000, (req,res)=>{
    console.log("Servidor rodando")
})