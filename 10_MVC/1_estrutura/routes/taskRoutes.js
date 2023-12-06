const express = require('express')
const Router = express.Router()
/tasks/add

const TaskController = require('../controllers/TaskController')

//Toda vez que chegar uma url task/add irá cair aqui, pois está configurado no index que /task irá mandar para esta pasta
//Quando a url for /add  ele irá pegar o controller e a classe e executa a função de createTask
//Essa função renderiza a página task/create
Router.get('/add', TaskController.createTask)

//Quando vier uma requisição do tipo POST na url  tasks/add, ele irá executar esse função
//Em cima ele só exibe a página, pois está no metodo get agora ele está colocando dados
Router.post('/add', TaskController.createTaskSave)

Router.post('/remove', TaskController.removeTask)

Router.post('/edit/:id', TaskController.updateTask)

Router.post('/edit', TaskController.updateTaskPost)

Router.post('/updatestatus', TaskController.toogleTaskStatus)

//Quando não tiver nada depois do /task irá cair aqui e irá renderizar a home
Router.get('/', TaskController.showTasks)

module.exports = Router