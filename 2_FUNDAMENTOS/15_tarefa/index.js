const inquirer = require('inquirer');
const chalk = require('chalk')

inquirer.prompt([
    {
        name: 'p1', message: 'Qual o seu nome?'
    },{
        name: 'p2', message:'Qual é sua idade?'
    }
])
.then((respostas)=>{
    console.log(chalk.black.bgYellow("O nome dele é "+respostas.p1+" e ele tem "+respostas.p2+" anos"))//esta pegando as respostas que tiver o name p1 ou p2
})
.catch((err)=>{
    console.log(err)
})