const _ = require('lodash')

const a = [1,2,3,4,5]
const b = [2,4,6,8]

//Está listando a diferença entre a,b
const diff = _.difference(a,b)

console.log(diff)