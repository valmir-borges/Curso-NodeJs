const fs = require('fs');

console.log("Início");
fs.writeFileSync('arquivo.txt', "Yas é bom")//A função do módulo core ela escreve arquivos
//Primeiro dá o nome e o tipo do arquivo e depois o conteúdo, portanto com essa função no modo sync, quer dizer que enquanto o arquivo não for criao não sera dado console.log(fim)
console.log("fim")