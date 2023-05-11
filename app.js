const express = require('express')
const app = express()
const port = 3001
const router = require("./routes/index")

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

const session = require('express-session')

app.use(session({
  name: 'session',
  secret: 'key',
}))

app.use(router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
