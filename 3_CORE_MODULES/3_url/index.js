const addres = 'https://www.meusite.com.br/catalogo?produtos=cadeira'//Endereço do meu site
const url = require('url')
//Foi instanciado o módulo core url, pois é necessário que haja diferentes módulos url para cada usuário
//Pois se 2 usuários utilizar 2 módulos url ao mesmo tempo da problema, portanto é necessário que haja um módulo para cada
const parsedUrl = new url.URL(addres)//Está dando como parâmetro a const addrees, para que procure ela e pegue a url


console.log(parsedUrl.host)//Está dando console.log na parte da url que é denominado como host, geralmente começa no www e termina na primeira barra
console.log(parsedUrl.pathname)//Está pegando o caminho que o usuário está, normalmente é depois da / do .com.br
console.log(parsedUrl.search)//Está pegando o que o usuário está procurando na url, normalmente é depois da ?
console.log(parsedUrl.searchParams)//Está pegando os parâmetros de busca que o usuário tem na url
console.log(parsedUrl.searchParams.get('produtos'));//Está pegando os parâmetros de busca que o usuário tem na url, porém agora, pegando (get) o parâmetro produtos e exibindo seu valor