const x = 10//Definindo x como 10

try {//Tentando mudar valor de x, porém como é uma const ele nao muda
    x=2
}
catch (err){//O programa irá cair neste códio, o catch, que irá exibir um erro, porém irá deixar o código seguir
    console.log(`Erro: ${err}`)
}
console.log("Continuando o código")