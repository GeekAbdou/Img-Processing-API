import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

import config from './config'
import errorMiddlewareError from './middleware/error'
import rateLimtter from './middleware/rareLimt'
import routes from './routes/main'

const PORT = config.port

// create an instance server
const app = express()

// error handler & middleware & rate-limiting for protecting against DDOSS attack for example or overload on the server
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(errorMiddlewareError)
app.use(rateLimtter)

//welcome message for the API &  path and checking thumbnails folder existence
app.get('/', (_req, _res) => {
    _res.json({
        message: `Welcome To Img Resizer API You can see image List by Visiting: http://localhost:${PORT}/api/manual`,
    })
})

//app router
app.use('/api', routes)

//Making thumbnail file if not exists
if (!fs.existsSync('img/thumb')) {
    fs.mkdirSync('img/thumb')
}

// start express server
app.listen(PORT, () => {
    console.log(`Please Visit localhost:${PORT}`)
})
export default app
