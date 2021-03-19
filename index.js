const express = require("express")
const routerAdmin = require('./routes/index')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/CMU', routerAdmin) //注册陆游


app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000')
})