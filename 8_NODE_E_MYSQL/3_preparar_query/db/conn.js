const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: '10',//10 conexões limites
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

module.exports = pool