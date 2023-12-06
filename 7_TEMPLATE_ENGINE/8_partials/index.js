const express = require('express')
const exphbs = require('express-handlebars')

const app = express()//Iniciando o express na const app

//Configurando o handlebars para o uso de partials
const hbs = exphbs.create({//Tem um método dentro do express-handlebars que configura o uso do partials
    //Indicando onde fica o diretório dos partiasl
    partialsDir: ['views/partials']
})

//Definindo o handlebars como template engine
//Quanto as diferentes páginas são renderizadas a partir do app.get, eles serão renderizadas dentro do arquivo main que está dentro de layout
//Não é preciso dizer a onde está esse arquivo e qual seu nome, pois por padrão o handlebars já sabe que tem que procurar o arquivo de molde nesse diretório views/layouts/main.
app.engine('handlebars', hbs.engine)

//Está setando as view do engine como handlebars
app.set('view engine', 'handlebars')

//Definindo onde o handlebars irá pegar os arquivos estáticos
app.use(express.static('public'))

//Usando o partials(basicamente aquele component de card da placa que usamos no react)
app.get('/blog', (req,res)=>{
    //Foi criado um array de objetos, em que cada objeto é um post diferente
    const posts = [
        {
            title:'Aprendendo Nodejs',
            category: 'JavaScript',
            body: 'Neste post vamos aprender sobre Nodejs',
            comments: 4
        },
        {
            title:'Aprendendo PHP',
            category: 'PHP',
            body: 'Neste post vamos aprender sobre PHP',
            comments: 4
        },
        {
            title:'Aprendendo C#',
            category: 'C#',
            body: 'Neste post vamos aprender sobre C#',
            comments: 4
        }
    ]
    //Na página que será renderizado o partials, ou seja, onde for chamado o partials, ficará assim:
    /* => O each irá ficar repetindo o que estiver dentro dele, ou seja, enquanto tiver obejetos dentro de posts
    <h1>Veja os nossos Posts</h1>
    {{#each posts}}
    {{> post}} => Aqui foi importado o partials, para que a cada repetição do each for criado um partials diferente
    {{/each}}
    */

    //Na página do partials
    /*
    <h2> {{this.title}} </h2> => Foi utilizado this, pois está pegando o title daquela repetição, e não de outra, pois tem 3 objetos com a chave title, e queremos pegar o daquela rep
    <p>Categoria: {{this.category}} </p>
    <a href="#">Voltar</a>
    */
    res.render('blog', {posts:posts})
})

app.get('/post', (req,res)=>{
    //Usando o with, ele é muito bom para o encurtamento do código
    //Pois, com ele é possível acessar chaves e valores de um objeto sem ficar colocando objeto.name, objeto.idade e etc
    const post = {
        title:'Aprendendo Nodejs',
        category: 'JavaScript',
        body: 'Neste post vamos aprender sobre Nodejs',
        comments: 4
    }
    //No arquivo que vai ser renderizado esse objeto ficará assim
    /*
    {{#with post}} => Iniciando com o with e dizendo que todas as próximas propriedades que forem passadas ele utilizará o post
    <h1> {{title}} </h1>
    <h2> {{category}} </h2>
    <span> {{body}} </span>
    <span> {{comments}} </span>
    {{/with}}
    */
    res.render('blogpost', {post:post})
})


app.get('/dashboard', (req,res)=>{
    //Renderizando um array a partir do each
    //O item irá ficar repetindo aquele código até que não seja mais possível, neste caso, quando acabar os itens do array  
    const items = ['Item a', 'Item b', 'Item c']
    //Na página que for ser utilizado o each ficará assim
    /*
    {{#each items}} Primeiro chama o each e diz qual é a variável que ele vai utilizar
    <ul>
        <li> {{this}} </li> //E utiliza o this a onde queremos imprimir cada item do array
    </ul>
    {{/each}}
    */
    res.render('dashboard', {items:items})
})
app.get('/', (req,res)=>{
    //É possível mandar variáveis para o front, fazendo com que o código seja dinâmico
    //É necessário criar as variáveis aqui e mandar no render
    //É possível criar um objeto e mandar para o front
    const user = {
        name: "Valmir",
        sobrenome: "Valadão"
    }

    //Como também somente um número ou string
    const age = 16

    //É possível fazer a renderização condicional a partir das variáveis mandadas pela resposta
    const autenticado =  true
    //Na página que for ter a renderização condicional é necessário seguir essa estrutura

    //{{#if autenticado}}
    //<p>Você está autenticado, <a href="/dashboard">clique aqui</a> e vá para a área de membros</p>
    //{{/if}}

    //Se autenticado for true, exibe aquilo, se não for true faz nada

    //Também é possível utilizar o else
    const aproved = true
    //Na página que irá renderizar

    /*
    {{#if aproved}}  => Se aprovado for verdadeiro irá exibir o que estiver em baixo
    <p>Você foi aprovado</p>
    {{else}}  => Se não for verdadeiro irá exibir isto
    <p>Você não foi aprovado</p>
    {{/if}}
    */

    //Com o else é possível exibir algo mesmo que a condição for falsa

    //O primeiro valor na exportação das variáveis representa como ele vai ser chamada no arquivo .handlebars
    //O segundo valor representa como ela está definida aqui no back
    //Para usa-la no front basta colocar {{usuario}} e acessar os diferentes itens do objeto a partir do .
    res.render('home', {usuario:user, idade:age, autenticado:autenticado, aproved:aproved })//Agora é usado o render ao invés do sendFile
    //A página home contém somente o miolo do site (body)
    //Porém já vem configurado do handlebars que ele irá procurar uma pasta chamada views dentro dela layouts e um arquivo chamado main.handlebars
    //Esete arquivo irá conter o layout base da página que só será alterado seu conteudo 
})

app.listen(3000, (req,res)=>{
    console.log("Servidor rodando")
})