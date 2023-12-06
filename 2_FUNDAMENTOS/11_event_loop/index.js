//Basicamente o eventloop garante que o código seja executado de forma ordenada de cima para baixo

function a(){
    console.log("Executando a()")
}

function b(){
    console.log("Executando b()")
}

function c(){
    console.log("Executando c()")
    b()
    a()
}
//Já aqui será executado somente o c que posteriormente irá executar o b e depois o a
c()

//Aqui será executado primeiro o a, depois o b e depois o c
//a()
//b()
//c()