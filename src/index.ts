import express from 'express'
import UserRouter from './user'

const main = () => {
    const app = express()
    app.use(express.json())

    app.use('/user', UserRouter)

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
}

main()
