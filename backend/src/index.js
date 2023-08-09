const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const transactions = require('./routes')

const app = express()
app.use(cors())

dotenv.config()
app.use(express.json())

app.use('/', transactions)

app.listen(4001,()=>{
    console.log("Server is Running on Port 4001")
})