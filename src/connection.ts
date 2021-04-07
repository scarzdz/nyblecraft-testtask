import mysql from 'mysql2'
import mysqlconfig from './mysqlconfig'

let connection = mysql.createConnection(mysqlconfig)

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message)
    }

    console.log('Connected to the MySQL server.')
})

export const db = connection