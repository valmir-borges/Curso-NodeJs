const router = require('express').Router()
const PetController = require('../controllers/PetController')

//middlewares
const verifytoken = require('../helpers/verify-token')
const {imageUpload} = require('../helpers/image-upload')

router.post('/create', verifytoken, imageUpload.array('images'), PetController.create)
//Vai ser utilizado o método array, pois ele é para várias imagens

//Rota para pegar todos os pets
router.get('/', PetController.getAll)

//Rota que pega os pets de um usuário
router.get('/mypets', verifytoken, PetController.getAllUserPets)

module.exports = router