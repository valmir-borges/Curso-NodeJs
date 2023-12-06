const fs = require('fs');

console.log("Início")
//Com a função sem o sync quer dizer que ela é uma função assíncrona
//Portanto, enquanto este arquivo não for criado ele pulará para a próxima linha, e quando for criado retornará aqui e dará o console.log("Aqruivo criado")
fs.writeFile("arquivo.txt", "Yas é bom", function(err){
    setTimeout(function(){
        console.log("Arquivo criado")
    }, 2000)//Delay para aparecer o console.log
})
console.log("Fim")