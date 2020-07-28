const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Usuario = require('./modelo/Usuario')
const UsuarioController = require('./controller/UsuarioController')
const db = require('./db/bancoDeDados')

// config de bodyparser 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// config do banco 

db.authenticate()
    .then(()=>{
        console.log('Conectado no banco de dados')
    }).catch(erro=>{
        console.log('Ocorreu um erro '+erro)
    })

// config da rota 
app.use('/',UsuarioController)


// config de do servidor 
app.listen(8080,function(){
    console.log('Servidor rodando na url localhost:8080')
})