const Task = require('../models/Task')//Importando o model desse controler, todo controller tem 1 model

module.exports = class TaskController{
    static createTask(req,res){//createTask é um método estático que quando chamado irá renderizar uma outra página
        res.render('tasks/create')
    }
    static async showTasks(req,res){//Mostrando todas as taks
        //Pegando todas as taks do banco
        //E pssando o raw como true para não vir a resposta muito bruta
        const tasks = await Task.findAll({raw: true})
        res.render('tasks/all', {tasks:tasks})
    }
    static async createTaskSave(req, res){

        //Criando um objeto para ser enviado ao banco de dados
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false//Marcando a tarefa como falsa
        }
        //E espere o dado ser inserido no banco para prosseguir
        await Task.create(task)

        res.redirect('/tasks')//Redirecionando para a home, que ativa a função que mostra todas as taks, basicamente fazendo um ciclo
    }
    static async removeTask(req,res){
        const id = req.body.id

        await Task.destroy({where: {id:id}})//Irá excluir do banco o dado que tiver o id igual o id que foi passado

        res.redirect('/tasks')
    }
    static async updateTask(req,res){
        const id = req.params.id

        const task = await Task.findOne({where: {id:id}, raw: true})

        res.render('tasks/edit', {task:task})
    }
    static async updateTaskPost(req,res){
        const id = req.body.id

        const task = {
            title: req.body.title,
            description: req.body.description
        }
        await Task.update(task, {where: {id:id}})

        res.redirect('/tasks')
    }
    static async toogleTaskStatus(req,res){
        const id = req.body.id

        const task ={
            done: req.body.done === '0' ? true : false
            //Quando o done for pego pelo corpo da requisição, se ele estiver false, ou seja, 0 será trocado para true, pois foi clicado para marcar a tarefa como feita
            //Se não vai ser false
        }
        await Task.update(task,{where: {id:id}})

        res.redirect('/tasks')
    }
}