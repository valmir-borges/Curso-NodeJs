const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

//Importanto o helper
const checkAuth = require('../helpers/auth').checkAuth//O . no final está pegando a função logo de cara, especificamente

//Toda vez que vier na requisição do usuário uma rota /toughts/, irá cair aqui e será executado alguma função salva do controller

router.get('/', ToughtController.showToughts)

//Toda rota que cair aqui, será executado antes do controller um middleware, para verificar o login, se for recusado ele será enviado para o login, se não a aplicação segue para o controller
router.get('/dashboard', checkAuth, ToughtController.dashboard)

router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)

router.post('/remove', checkAuth, ToughtController.removeTought)
router.get('/edit/:id', checkAuth, ToughtController.updateTought)
router.post('/edit', checkAuth, ToughtController.updateToughtSave)
module.exports = router