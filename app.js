const express = require('express')
const app = express()
const router = require('./routes/router')
const bodyParser = require('body-parser')
const handlebars = require("express-handlebars")
const path = require("path")
const mongoose = require('mongoose');

//configurando o mongoose
mongoose.connect('mongodb://localhost/tasks', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Mongo conectado')
}).catch((err) => {
    console.log('Houve um erro ao se conecta com o Mongo: '+err)
})

// avisando que o public é pasta que contém os arquivos estáticos
app.use(express.static(path.join(__dirname, "public")))

//configurando body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//usando as rotas da página router.js
app.use(router)

//configurando para usar o handlebars como template engine
    //e avisando que nosso arquivo default para é o main
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.listen('8080', function(){
    console.log('rodando!')
})