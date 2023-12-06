const fs = require('fs')

//Passando os parâmetros desta função por const
const arqAntigo = 'arquivo.txt'//Const do arquivo antigo
const arqNovo = 'yasébom.txt'//Const do arquivo novo

//Sempre o primeiro parâmetro do rename será o arquivo antigo e o segundo o nome que você quer dar
fs.rename(arqAntigo, arqNovo, function(err){
    if(err){
        console.log(err)
        return
    }
    else{
        //Interpolando strings para aceitar variável
        console.log(`O arquivo ${arqAntigo} foi renomeado para ${arqNovo}`)
    }
})