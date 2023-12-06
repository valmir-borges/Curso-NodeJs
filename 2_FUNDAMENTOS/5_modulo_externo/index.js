//Para baixar esse módulo externo, primeiro da npm init e confirma tudo
//Depois da npm install "nome do módulo"
const minimist = require('minimist')//Improtanto o módulo e colocando em uma const

const args = minimist(process.argv.slice(2))//Quando for mandado argumentos pelo terminal o módulo minimist tem uma função que pega os argumentos automatico
//Esta pegando o índice 2, pois o índice 0 e 1 por padrão traz coisas desnecessárias

console.log(args)

const nome = args['Nome']//Estamos colocando dentro da const nome o argumento que tiver como parâmetro a escrita nome
//O nome da variável tem que estar idêntico
const profissao = args['Profissao']
console.log("O nome dele é "+nome+" e ele é "+profissao)

//Para mandar agumentos pelo terminal é necessário adicionar --
