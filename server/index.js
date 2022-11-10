const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const filePathMiddleware = require('./middleware/filepath.middleware')
const app = express()
const PORT = process.env.PORT || config.get('serverPort')
const path = require('path')

app.use(cors())
app.use(fileUpload({}))
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)

const start = async () => {
    try {
        mongoose.connect(config.get('dbURL'))

        app.listen(PORT, () => {
            console.log('Server started on port', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
