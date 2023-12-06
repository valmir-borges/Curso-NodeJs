const meumodulo = require('./meu_modulo');//Colocando o módulo em uma const, igual o import
const soma = meumodulo.soma//Pegando a função de somar do módulo e colocando em uma const, para que seja mais fácil utiliza-la

soma(2,5)//A função já está esperando dois parâmetros, se colocar mais vai só ler os 2 primeiros