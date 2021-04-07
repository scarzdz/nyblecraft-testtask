import express from 'express'
import { RowDataPacket } from 'mysql2/typings/mysql'
import { db } from "./connection"

const router = express.Router()

router.post('/generate_pdf', (req, res) => {

    const firstName = req.body.firstName

    let sql = "SELECT * FROM `user` WHERE `firstName` = ?"

    db.query(sql, [firstName], function (err, data: RowDataPacket[]) {
        if (err) {
            throw err
        }

        console.log(data)
        res.json({
            result: true
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
