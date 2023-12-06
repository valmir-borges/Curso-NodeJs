const fs = require('fs')//é um import so que utilizando require, coloca em uma const pois nunca será mudado, pois é uma biblioteca (File system)

fs.readFile('arquivo.txt','utf-8', (err, data)=>{//Err de erro e data de arquivos, no caso e resposta certa
    if(err){
        console.log(err)
    }
    console.log(data)
})//Basicamente dentro dessa biblioteca tem uma função que lê arquivos, e para isto é necessário dar parâmetros, o que vai ser lido, lingua e retornar algo