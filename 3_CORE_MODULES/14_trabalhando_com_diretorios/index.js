const fs = require('fs')

fs.mkdirSync('minhapasta')//Irá criar uma pasta

if(fs.existsSync("./minhapasta")){//Se dentro desse diretório existir a minha pasta
    console.log("Existe")
}
if(!fs.existsSync('./minhapasta')){//Se dentro dessa pasta (./) não existir (!) a pasta "minhapasta"
    console.log("Não existe!")
}