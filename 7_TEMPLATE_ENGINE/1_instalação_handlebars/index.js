const express = require('express')
const exphbs = require('express-handlebars')

const app = express()//Iniciando o express na const app

//Definindo o handlebars como template engine
app.engine('handlebars', exphbs.engine())

//Está setando as view do engine como handlebars
app.set('view engine', 'handlebars')


app.get('/', (req,res)=>{
    res.render('home', {layout:false})//Agora é usado o render ao invés do sendFile
})

app.listen(3000, (req,res)=>{
    console.log("Servidor rodando")
})