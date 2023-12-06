//Basicamente o chalk é um módulo externo que consegue estilizar as informações no console log
const chalk = require('chalk')

const nota = 9

if (nota >= 7){
    console.log(chalk.green("Parabéns você foi aprovado"))//Está pegando a informação do console log e transformando o texto em verde
}
else{
    console.log(chalk.bgRed("Você está de recuperação"))//Está mudando o background color do texto para vermelho
}