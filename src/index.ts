import express from 'express'
import { db } from './connection'

const main = () => {
    const app = express()
    app.use(express.json())

    // simple query
    db.query(
        'SELECT * FROM `user`',
        function (err, results) {
            if (err) {
                throw err
            }
            console.log(results);
        }
    );

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}

main()
