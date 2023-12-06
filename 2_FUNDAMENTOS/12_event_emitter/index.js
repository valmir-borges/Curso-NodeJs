const EventMitter = require('events')//Chamando a classe eventmitter pelo módulo core events
const eventmitter = new EventMitter()//Instânciar algo

//Definindo o eventmitter
eventmitter.on('start', ()=>{//.on é o add event linster do js, ele irá ficar esperando ocorrer algum evento para disparar essa função
    console.log('Durante')
})

console.log("Antes");
eventmitter.emit('start')//Emitindo o eventmitter do tipo start
console.log("Depois")