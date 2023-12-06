const path = require('path')

//Path abasoluto
//Função resolve
//Ele pega desde o disco local do computador até a o arquivo onde ele está
console.log(path.resolve('arquivo.txt'))

//Formando um próprio path
//Caminhos que irão compor o path
const midpath = 'catálogo'
const arqpath = '1660super.pdf'//Arquivo qdo path

//Path montado a partir do join
//O join recebe quantos parâmetos quiser, podendo ser a partir de variáveis ou de consts
const finalPath = path.join('/', midpath, arqpath)
console.log(finalPath)