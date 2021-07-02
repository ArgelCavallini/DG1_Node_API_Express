const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./src/userRoute');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:false}))

userRoute(app)

app.get('/', (req,res) => res.send("Olá"))

app.listen(port,()=> console.log('rodando...'))