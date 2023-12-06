const fs = require('fs')

fs.unlink('arquivo.txt', function(err){//Este método do fs irá remvoer o arquivo com o nome arquivo.txt e está sendo dado uma função para essa exclusão
    //Só tem como dar err, pois data é o contéudo retornando após uma leitura
    if(err){//Se der err, ele irá dar console.log(err) e irá parar a aplicação
        console.log(err)
        return
    }
    else{
        console.log("Arquivo removido")
    }
})