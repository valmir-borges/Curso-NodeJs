const router = require('express').Router()
const UserController = require('../controllers/UserController')

//Middleware
const verifytoken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifytoken, imageUpload.single("image"), UserController.editUser)//Patch é um método do mongoose em que é atualizado
//Depois de passar no verifytoken, ele cai no upload de imagem, quer dizer que o sistema está esperando uma unica imagem (single) que virá pelo body como image

module.exports = router