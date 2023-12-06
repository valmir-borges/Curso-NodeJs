const express = require('express')
const exphbs = require('express-handlebars')

const app = express()//Iniciando o express na const app

//Definindo o handlebars como template engine
app.engine('handlebars', exphbs.engine())

//Está setando as view do engine como handlebars
app.set('view engine', 'handlebars')

//Quanto a dashboard e a home serão renderizadas dentro do arquivo main, porém com conteúdos diferentes
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