import mysql from 'mysql2'
import mysqlconfig from './mysqlconfig'

const pool = mysql.createPool(mysqlconfig);

export const db = pool
