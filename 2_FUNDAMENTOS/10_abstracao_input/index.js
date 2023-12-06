import inquirer from 'inquirer';

inquirer.prompt([//Dentro do módulo inquirer tem o método prompt, ele é responsável por fazer as perguntas pelo terminal
  //As perguntas vão ficar em um array
    { name: 'p1', message: 'Qual a primeira nota?' },//Cada pergunta será colocada em um objeto, cada objeto terá um nome e a message
    { name: 'p2', message: 'Qual a segunda nota?' },
  ])
  .then((respostas) => {//Se tudo der certo com as perguntas, então, pega as respostas e mostra no console
    console.log(respostas)
    const media = (parseInt(respostas.p1) + parseInt(respostas.p2)) / 2//Será feito uma média das notas, para isto é necessário pegar a respostas (argumento) de cada pergunta

    console.log(`A média do aluno é ${media}`)
  })
  .catch((err) => {
    console.log(err)
  })