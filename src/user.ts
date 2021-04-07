import express from 'express'
import { RowDataPacket } from 'mysql2/typings/mysql'
import { db } from "./connection"
import generatePDF from './pdfGenerator'

const router = express.Router()

router.post('/generate_pdf', (req, res) => {

    const firstName = req.body.firstName

    let sql = "SELECT * FROM `user` WHERE `firstName` = ?"

    db.getConnection(function (err, conn) {
        if (err) {
            throw err
        }
        conn.query(sql, [firstName], function (err, data: RowDataPacket[]) {
            if (err) {
                throw err
            }

            if (data.length === 0) {
                res.json({
                    result: false
                })
            } else {
                const pdf = generatePDF(data[0].firstName, data[0].lastName, data[0].image)
                const pdfBuff = Buffer.from(pdf)

                conn.query("UPDATE `user` SET `pdf` = ? WHERE id = ?", [pdfBuff, data[0].id], (err) => {
                    conn.release()
                    if (err) {
                        throw err
                    }
                })

                res.json({
                    result: true,
                    pdfBuff
                })
            }
        })
    })
})

router.get('/list', function (_, res) {
    let sql = "SELECT * FROM user";
    db.query(sql, function (err, data, _) {
        if (err) throw err;
        res.json({
            data
        })
    })
})

export default router;
