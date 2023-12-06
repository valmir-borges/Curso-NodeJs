const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//Criando rotas-endpoints

//Criando um rota de get
app.get('/', (req,res)=>{
    //Ao invés de renderizar uma view, a resposta será enviada um json
    //Que terá chave chamada message e valor
    res.status(200).json({message: "Primeira rota criada com sucesso!"})
})

//Criando uma rota de post
app.post('/createproduct', (req,res)=>{
    //Pegando os parâmetros pelo corpo da requisição
    const name = req.body.name
    const price = req.body.price

    if(!name){//Se o nome não vier na requisição o status será 422, que significa um erro
        res.status(422).json({message: "O campo nome é obrigatório"})
        return
    }

    res.status(201).json({message: `O produto ${name} foi criado com sucesso`})
    //O status serve para ser tipo um feedback do que aconteceu, cada número representa um tipo de erro ou validação

    console.log(name)
    console.log(price)
})

app.listen(3000)