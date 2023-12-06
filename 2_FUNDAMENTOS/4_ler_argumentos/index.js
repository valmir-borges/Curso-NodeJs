//nome
console.log(process.argv)//Esta dando console log nos argumentos, por padrão do node ele já cria 2, portanto é possível mandar mais 1 por linha de comando (terminal)

const args = process.argv.slice(2)//Estamos pegando o indice 2 do array de argumentos que o node retorna, no caso o nosso nome

console.log(args)

const nome = args[0].split('=')[1]//Dentro do array de args, ou seja, "Nome=valmir", estamos dividindo a string (cada indice) em 2 partes quando for visto um =
//Após a divisão será colocado em um array ambas as partes, e pegaremos o índice 1, pois é a segunda parte que queremos, o valor

console.log(nome)

//Pegar dois argumentos

const idade = args[1].split('=')[1]//Agora na variável argumentos a idade fica na posição 1, portanto pegaremos a posição 1 dividiremos em 2
console.log(idade)

console.log('O nome dele é '+nome+' e ele tem '+idade+' anos')//Agora compondo uma string com as duas variavels que foram retiradas a partir de argumentos