const Tought = require('../models/Tought')
const User = require('../models/User')

const {Op} = require('sequelize')//Módulo que filtra a busca do usuário, toda palavra que conter aquilo que foi digitado será pego
//Por exemplo se for digitado a letra a, todos os pensamentos que tiverem a letra a vão ser tragos

module.exports = class ToughtsController{
    //Quando essa função for chamada nas rotas ela irá renderizar a url toughts/home
    static async showToughts(req,res){

        let search = ''

        //Quando o usuário clica naquele botão de pesquisar os pensamentos, a url dele ganha um novo parâmetro, que será igual ao que foi digitado no input
        //localhost:3000/?search=filtra
        //A url dele recebe um parâmetro dinâmico, neste caso o filtra
        if(req.query.search){//Portanto se na url dele tiver na query o parâmetro serach
            search = req.query.search//Será colocado dentro da nossa variável
        }

        //Startando a variável como decrescente, pois queremos ver por padrão um pensamento do mais novo para o mais velho
        let order = 'DESC'
        if(req.query.order === 'old'){//Se na query order na requisição do usuário vier o parâmetro old, quer dizer que ele quer ver as mais antigas primeiro
            //Este parâmetro ele vem na query, pois cada flecha está dentro de um form
            order = 'ASC'
        }
        else{
            order = 'DESC'
        }
        //E depois passa para a query que vai buscar no banco, que ele irá filtrar todos os pensamentos na tabela createdAt a partir do valor da variável order

        const toughtsData = await Tought.findAll({include: User, where: {title: {[Op.like]: `%${search}%`}}, order: [['createdAt', order]]})
        //Método que pega todos os dados do banco sem filtro, irá servir para peagr todos os pensamentos
        //Inclui a tabela User, pois é necessário saber de quem é aquele pensamento
        //Está filtrando os pensamentos a partir do que foi digitado na busca, se não foi digitado nada ele traz tudo mesmo assim, se foi ele filtra
        //%${search}% == está buscando no banco de dados na tabela title, todos os dados que contém o que está na variável search, pode conter antes ou depois não importa

        const toughts = toughtsData.map((result)=>result.get({plain:true}))//Filtrando a partir do get, que ele irá colocar tanto o usuário quanto o pensamento em um array só

        let toughtsQty = toughts.length//Variável para armazenar a quantidade de toughts
        //Independente se está filtrado ou não ela irá trazer a quantidade de toughts

        //O handlebars entende que 0 não é falso, portanto é necessário fazer isso manualmente
        if(toughtsQty=== 0 ){
            toughtsQty = false
        }
        res.render('toughts/home', {toughts:toughts, search:search, toughtsQty: toughtsQty})
    }
    static async dashboard(req,res){
        const userId = req.session.userid

        //Será user, pois estamos na dashboard DAQUELE usuário, ou seja, ele irá ver somente os pensamentos dele
        const user = await User.findOne({where: {id:userId}, include: Tought, plain: true})//Verificando se o usuário existe
        //Buscando na tabela User, o usuário com o id passado na hora de trazer é para incluir todos os dados da tabela Tought que tem o mesmo id, só que no caso na coluna UserId
        //plain: true, é para trazer somente os dados principais em um array
        //Se o usuário não existir a variável irá retornar vazia
        if(!user){
            res.redirect('/login')
        }
        //Mesmo utilizando o plain ele traz muitos dados, portanto é necessário filtrar
        const toughts = user.Toughts.map((result)=>result.dataValues)
        //Está pegando o que o banco de dados retorna para nós, porém são muitos dados desnecessários, portanto utiliza o map
        //Ele irá mapear o que for retornado do user, porém somente o que foi retornado da tabela Toughts, pois utilizamos o include
        //Em que result é cada dado retornado da tabela tought e é necessário pegar o dataValues de cada
        
        let emptyToughts = false //Criando uma variável para passar para o front dizendo se tem ou não tarefas daquele usuário
        //Irá começar como false, pois normalmente o usuário já tem tarefa

        if(toughts.length === 0 ){//Se o array que for retornado estiver vazio, a emptyToughts será true, pois não há tarefas
            emptyToughts = true
        }

        res.render('toughts/dashboard' , {toughts:toughts , emptyToughts: emptyToughts})
    }
    static createTought(req,res){
        res.render('toughts/create')
    }
    static async createToughtSave(req,res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        try {
            await Tought.create(tought)
            req.flash('message', 'Pensamento criado com sucesso!')//A flash message é algo salvo na sessão do usuário
            
            req.session.save(()=>{//Portanto salvamos a message na sessão do usuário e redirecionamos para a dashboard
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async removeTought(req,res){
        const id = req.body.id//Pegando o id do pensamento
        const UserId = req.session.userid
        //Deletando um dado da tabela onde o id do pensamento for igual ao que foi passado e também o id da sessão tem que ser igual ao UserId da tarefa
        //Duas verificações

        try {
            await Tought.destroy({where: {id:id, UserId: UserId}})
            req.flash('message', 'Pensamento removido com sucesso!')//A flash message é algo salvo na sessão do usuário
            
            req.session.save(()=>{//Portanto salvamos a message na sessão do usuário e redirecionamos para a dashboard
                res.redirect('/toughts/dashboard')})

        } catch (error) {
            console.log(error)
        }
    }
    static async updateTought(req,res){
        const id = req.params.id

        const tought = await Tought.findOne({where: {id:id}, raw: true})

        res.render('toughts/edit', {tought: tought})
    }
    static async updateToughtSave(req,res){
        const id = req.body.id
        const tought = {
            title: req.body.title
        }
        try {
            await Tought.update(tought,{where: {id:id}})
            req.flash('message', 'Pensamento atualizado com sucesso!')//A flash message é algo salvo na sessão do usuário
            
            req.session.save(()=>{//Portanto salvamos a message na sessão do usuário e redirecionamos para a dashboard
                res.redirect('/toughts/dashboard')})

        } catch (error) {
            console.log(error)
        }
    }
}