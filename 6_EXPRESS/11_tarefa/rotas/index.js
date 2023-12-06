const express = require('express')
const router = express()
const path = require('path')

const basePath = path.join(__dirname, '../templates')//Pegando a pasta que contém nossos html

//A rota que o usuário acessar que tiver /champions vai vir para essa página

//E a rota que tiver /yas irá cair aqui
router.get('/jogo1', (req,res)=>{
    res.sendFile(`${basePath}/jogo1.html`)
})

router.get('/jogo2', (req,res)=>{
    res.sendFile(`${basePath}/jogo2.html`)
})




module.exports = router