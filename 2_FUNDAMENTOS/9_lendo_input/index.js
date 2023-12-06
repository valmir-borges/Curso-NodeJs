//Importando um módulo core, que já vem com o node
//Este módulo permite a criação de uma interfaçe que consiga mandar perguntas e devolver respostas
const readline = require('readline').createInterface({
    input: process.stdin,//Aqui entra os dados
    output: process.stdout//Aqui sai os dados
})

//Fazendo a pergunta
readline.question("Qual a sua linguagem preferida?", (language) =>{//Primeiro se faz a pergunta, logo depois coloca o argumento que será devolvido pelo usuário
    ///Com este argumentos em mãos é possível colocá-lo no terminal de volta
    if(language==="Python"||language==="JS"){//Se a resposta do usuário for extamente isto
        console.log("Credo")
        readline.close()
    }
    else{
        console.log('A sua linguagem de programação preferida é '+language)
        readline.close()
    }
})

