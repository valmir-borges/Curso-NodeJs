const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

//Controller

//Toda vez que vier na requisição do usuário uma rota /toughts/, irá cair aqui e será executado essa função do controller
router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)

router.get('/register', AuthController.register)
router.post('/register', AuthController.registerPost)//Somente quando a rota for com método post irá cair aqui

router.get('/logout', AuthController.logout)
module.exports = router