//Importando o minimist, o modulo externo
const minimist = require('minimist')

//Modulo externo
const args = minimist(process.argv.slice(2))//Está pegando os argumentos do índice 2, pois o 0 e 1 não são argumentos que o usuario mandou

//Modulo interno, nossa função de somar
const soma = require('./soma').soma//O modulo pode ter varias funções, porém estou pegando somente a de soma, ou seja, .soma

const a = parseInt(args["a"]);//O argumento que for passado por terminal e tiver como parametro o nome "a" vai ser colocado dentro de uma variavel
const b = parseInt(args["b"]);//O argumento que for passado por terminal e tiver como parametro o nome "b" vai ser colocado dentro de uma variavel

soma(a,b)//Estamos pegando a função de dando como parametro as duas variaveis, ou seja, ele vai procurar esses 2 parametros e somar os argumentos dele