const os = require('os')

console.log(os.cpus())//Verificando a quantidade de core da cpu
console.log(os.freemem())//O quanto de memória ram tem disponível no sistema
console.log(os.homedir())//Qual é o usuário que está sendo usado
console.log(os.type())//Tipo de sistema operacional