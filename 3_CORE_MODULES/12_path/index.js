const path = require('path')

const mypath = '/catalogo/placasdevideo/gtx1660super.pdf'//Meu caminho de url até o arquivo .pdf
//O path irá se basear no arquivo, ou seja, aquilo que tiver .(extensão)

//Todos os path aqui estão em relação ao arquivo
console.log(path.dirname(mypath))//Pegando o diretório até o arquivo
console.log(path.basename(mypath))//Pegando o nome do arquivo
console.log(path.extname(mypath))//Pegando a extensão do arquivo