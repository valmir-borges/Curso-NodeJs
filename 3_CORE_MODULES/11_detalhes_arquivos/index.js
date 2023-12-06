const fs = require('fs')

fs.stat('arquivo.txt', (err, stats) =>{//A função stat do módulo fs tem como primeiroa parâmetro o arquivo que será analisado
    //Ele irá retornar um err e um stats que irá conter as informações do arquivo
    if(err){
        console.log(err)
        return
    }
    else{
        console.log(stats.isFile())//Pegando a resposta se é um arquivo
        console.log(stats.isDirectory())//Pegando a resposta se é um diretório
        console.log(stats.isSymbolicLink())//Pegando a resposta se é um simboliclink
        console.log(stats.ctime)//Pegando a resposta da data de criação do arquivo
        console.log(stats.size)//Pegando a resposta do tamanho do arquivo
    }
})