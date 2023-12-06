//Se trata de um catch, porém mais severo, quando é usado o throw ele para toda a aplicação após sua linha de código
const x = '10'//Neste caso ele é uma string (entre aspa

//Checando se x é um número
if(!Number.isInteger(x)){
    throw new Error ("O valor de x não é um número")
}
//Se x for uma string ele não vai executar esse console.log
console.log("Continuando o código")