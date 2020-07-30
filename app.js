const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Usuario = require('./modelo/Usuario')
const Admin = require('./modelo/Admin')
const UsuarioController = require('./controller/UsuarioController')
const AdminController = require('./controller/AdminController')
const db = require('./db/bancoDeDados')
const cors = require('cors')

// config do cors
app.use(cors())

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
app.use('/',AdminController)


// config de do servidor 
app.listen(8080,function(){
    console.log('Servidor rodando na url localhost:8080')
})