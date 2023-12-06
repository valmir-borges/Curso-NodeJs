//Módulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

//Core módulos
const fs = require('fs')

//Começando o projeto

operation()//Chamando a função já que ela não é executada sozinha
function operation(){
    inquirer.prompt(//O módulo iqnuirer tem uma função de prompt que irá criar uma mini interface para o usuário no terminal
                    //Esse prompt será um objeto que terá type, name, message, choices(escolhas)
    [{
        type: 'list',//O tipo do prompt será em lista
        name: 'action',//A pergunta terá um name que será igual a action, a action de cada pergunta será igual ao texto da pergunta
        message: 'O que você deseja fazer',//E é necessário dar uma menssagem para o usuário
        choices: [//Escolhas do usuário
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Transferir',
            'Sair'
        ]
    }]
    //Quando o usuário escolher uma das opções será mandado para esse then
    ).then((resposta)=>{
        const action = resposta['action']//Está pegando a action da escolha do usuário, a action é a escolha do usuário
        if(action=== 'Criar Conta'){//Se a ação do usuário for exatamente igual ao nome Criar conta
            createAccount()//Está chamando a função
        }
        else if(action === 'Depositar'){
            deposit()
        }
        else if(action === 'Consultar Saldo'){
            getAccountBalance()
        }
        else if(action === 'Sacar'){
            withdraw()
        }
        else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'))
            process.exit//Irá encerrar o programa
        }
        else if (action === 'Transferir'){
            transferir()
        }

    })
    .catch((err)=> console.log(err))
}

//Criando uma conta
function createAccount(){
    console.log(chalk.bgGreen.black('Parábens por ter escolhido nosso banco'))
    console.log(chalk.green('Defina as opções da sua conta'))
    buildAccount()
}

//Criando o nome da conta
function buildAccount(){
    inquirer.prompt([{//Está sendo criado um prompt do modo simples em que será perguntado somente 1 pergunta e o usuário não pode escolher outra
        name: 'Accountname',
        message: 'Qual o nome da sua conta?'
    }])
    .then((resposta)=>{
        const accountName =  resposta['Accountname']//Está pegando a resposta do usuário relativa a esse name (Accountname)
        console.info(accountName)//Imprimindo na tela a partir do console.info

        //Criando um diretório para armazenar as contas
        if(!fs.existsSync('accounts')){//Se o diretório chamado accounts não existir ele irá criar um
            fs.mkdirSync('accounts')
        }
        if(fs.existsSync(`accounts/${accountName}.json`)){//Se já existir um arquivo json no diretório com o mesmo nome que o usuário passou será dado um erro
            console.log(chalk.bgRed.black('Essa conta já existe, por favor crie outra'))
            buildAccount()//E será chamado essa função, para que o usuário não volte do começo
            //Não exibe o createAccount, pois nele tem a mensagem de boas vindas e o usuário já tinha recebido

        }
        //Todos os if são em funções síncronas, portanto irá cair aqui após a conclusão deles
        //O writefile também é síncrono, pois assim ele não irá escrever antes de criar o diretório
        //Está criando o arquivo json dentro de accounts e cada arquivo terá o nome que o usuário passou
        //E o saldo inicial será 0
        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err){
            console.log(err)
        })
        console.log(chalk.green('Conta criada com sucesso'))
        operation()//Agora manda ele de volta para a "home" para ele fazer outras coisas

    })
    .catch((err)=>{
        console.log(err)
    })
}
//Função de depositar
function deposit(){
    inquirer.prompt([{
        name: "accountName",
        message: "Qual o nome da conta para depósito?"
    }])
    .then((resposta)=>{
        const accountName = resposta['accountName']//Está pegando a resposta da pergunta accountName

        //Está dando a variável accountName para a função trabalhar com ela
        if(!checkAccount(accountName)){//Se checkaccount retornar falso
            return deposit()//E manda de volta para o começo
        }
        //Se a conta existir
        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto deseja depositar?'
        }])
        .then((resposta)=>{
            const amount = resposta['amount']//Está pegando o valor que o usuário deseja depositar, pois amount remete a pergunta do valor
            addAmount(amount, accountName)
            operation()
        })
        .catch((err)=> {
            console.log(err)
        })

    })
    .catch((err)=>{
        console.log(err)
    })
}

//Função de adicionar valor a uma conta
//Mas antes é necessário pegar o valor da conta
function addAmount (amount, accountName){
    const accountData = getAccount(accountName)//Aqui está chamando a função de pegar (get) o valor da conta que foi passado a partir da variável (accountName)
    if(!amount){//Se o usuário não digitar o valor, ou seja, somente apertar enter
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return deposit()//E manda o usuário para o deposit
    }
    //Se o usuário digitar um valor
    //Irá pegar o accountData que está em objeto JSON, acessando a chave balance e somando mais o amount
    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)

    //Salvando a soma
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData),//E escreve no arquivo json daquele nome que foi passado e coloca a variável accountData nele
    function (err){
        console.log(err)
    }
    )
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na conta ${accountName}`))
}

//Função de chegar uma conta
function checkAccount(accountName){//Está dando como parâmetro o account name que será recebido pela função
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black("Essa conta não existe"))
        return false//Irá retornar para parar o programa e ser considerado como falso a chekagem
    }
    return true//Existe a conta

}

//Função de pegar o valor de uma conta
//O nome da conta a função está recebendo a partir do addamount
function getAccount(accountName){
    //Está lendo o arquivo json com o nome que foi passado pelo usuário
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        //Durante a leitura do arquivo será usado o utf-8 
        encoding: 'utf8',
        flag: 'r'//Isso serve para mostrar que é somente para leitura esse arquivo que foi passado
    })
    //A leitura está dentro do accountJSON
    return JSON.parse(accountJSON)//O accountJSON dentro dele está escrito em json, porém em formato de arquivo, porém é melhor transformar ele em JSON (objeto js)
    //E retorna o objeto json para a função que chamou essa função
}

//Função de pegar o saldo de uma conta
function getAccountBalance(){
    inquirer.prompt([{//Cria o corpo da prompt
        name: 'accountName',
        message: 'Qual o nome da conta para a consulta de saldo?'
    }])
    .then((respostas)=>{
        const accountName = respostas['accountName']//Pega o nome da conta que foi digitado
        checkAccount(accountName)//Verifica se a conta existe mandando a const accountName para a função
        if(!checkAccount(accountName)){//Se a função checkAccount retornar false
            console.log(chalk.bgRed.black('Essa conta não existe, escolha outra conta'))
            return getAccountBalance()
        }
        const accountData = getAccount(accountName)//Pegando os dados da conta a partir da função getAccount passando o accountName
        console.log(chalk.bgBlue.black(`O saldo da conta ${accountName} é de ${accountData.balance} reais`))//A accountData é um objeto JSON portanto é possível pegar o .balance
        return operation()
    })
    .catch((err)=>{
        console.log(err)
    })
}

//Função de sacar
function withdraw(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual a conta você deseja sacar?',
    }])
    .then((respostas)=>{
        const accountName = respostas['accountName']//Pega o nome da conta que foi digitado
        checkAccount(accountName)//Verifica se a conta existe mandando a const accountName para a função
        if(!checkAccount(accountName)){//Se a função checkAccount retornar false
            console.log(chalk.bgRed.black('Essa conta não existe, escolha outra conta'))
            return withdraw()
        }
        inquirer.prompt([{
            name: 'amount',
            message:'Quanto você deseja sacar?'
        }])
        .then((respostas)=>{
        const amount = respostas['amount']
        removeAmount(accountName, amount)
        })
        .catch((err)=>{
            console.log(err)
        })

    })
    .catch((err)=>{
        console.log(err)
    })
}
//Função de remover dinheiro
function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)//Recebendo a conta em JSON
    if(!amount){//Quando o usuário não digitar
        console.log(chalk.bgRed.black("Digite um valor válido"))
        return withdraw()
    }
    if (accountData.balance<amount){//Se o valor da conta for menor que o que será retirado
        console.log(chalk.bgRed.black('Valor indisponível'))
        return withdraw()
    }
    accountData.balance = parseFloat(accountData.balance)-parseFloat(amount)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData),//E escreve no arquivo json daquele nome que foi passado e coloca a variável accountData nele
    function (err){
        console.log(err)
    })
    console.log(chalk.green(`Foi realizado um saque de R$${amount} na conta de ${accountName}`))
    operation()
}

//Função de transferir EXTRA
function transferir(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual é a sua conta?'
    }])
    .then((resposta)=>{
        const accountname = resposta['accountName']
        checkAccount(accountname);
        if(!checkAccount(accountname)){
            console.log(chalk.bgRed.black('Essa conta não existe, digite outra'))
            return operation()
        }
        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto deseja transferir?'
        }])
        .then((resposta)=>{
            const amount = resposta['amount']
            const accountData = getAccount(accountname)
            if(!amount){
                console.log(chalk.bgRed.black('Digite um valor válido'))
            }
            if(accountData.balance<amount){
                console.log(chalk.bgRed.black('Valor indisponível em sua conta'))
                return operation()
            }
            accountData.balance = parseInt(accountData.balance)-parseInt(amount)
            fs.writeFileSync(`accounts/${accountname}.json`, JSON.stringify(accountData),
            function (err){
                console.log(err)
            })
            inquirer.prompt([{
                name: 'accountNametrans',
                message: 'Para quem você deseja transferir?'
            }])
            .then((resposta)=>{
                const accountNametrans = resposta['accountNametrans']
                if(!fs.existsSync(`accounts/${accountNametrans}.json`)){
                    console.log(chalk.bgRed.black("Essa conta não existe"))
                    return operation()
                }
                const accountJSONtrans = fs.readFileSync(`accounts/${accountNametrans}.json`,{
                encoding: 'utf8',
                flag: 'r'
                })
                const accountDataJSON = JSON.parse(accountJSONtrans)
                accountDataJSON.balance = parseInt(accountDataJSON.balance)+parseInt(amount)
                fs.writeFileSync(`accounts/${accountNametrans}.json`, JSON.stringify(accountDataJSON),
                function (err){
                    console.log(err)
                })
                console.log(chalk.green(`Foi realizado um depósito de ${amount} reais na conta de ${accountNametrans}`))
                return operation()
            })
        })
    })

}