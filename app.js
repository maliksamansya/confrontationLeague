const express = require('express')
const router = require('./routes')
const app = express()
const port = 3001


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));


const session = require('express-session')

app.use(session({
    name: 'session',
    secret: 'key',
}))
app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})