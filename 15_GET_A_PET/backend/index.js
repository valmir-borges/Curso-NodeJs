const express = require('express')
const cors = require('cors')

const app = express()

//Configurando a resposta em JSON
app.use(express.json())

//Cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
//credentials: true: Isso indica que as solicitações com credenciais, como cookies/tokens, são permitidas. 
//origin: 'http://localhost:3000': Isso define o domínio (ou URL de origem) que é permitido acessar o servidor. Neste caso, ele permite que o servidor seja acessado apenas a partir 
//de http://localhost:3000, que é um domínio local em execução na porta 3000. Isso é uma medida de segurança para garantir que apenas esse domínio específico tenha permissão para 
//fazer solicitações ao servidor.

//Pasta Public
app.use(express.static('public'))

//Rotas
const UserRoutes = require('./routes/UserRouter')
const PetRoutes = require('./routes/PetRouter')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)