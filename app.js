const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Usuario = require('./modelo/Usuario')

// config
app.use(bodyParser.urlencoded({extended:true}))


// cadastrar 

app.post('/usuarios',function(req,resp){
    const usuario = Usuario.create({
        nome:req.body.nome,
        sobrenome:req.body.sobrenome,
        funcao:req.body.funcao,
        salario:req.body.salario
    }).then(function(){
        resp.send('Cadastrado com sucesso')
    }).catch(function(error){
        resp.send('Houve um erro '+error)
    })
})

// listagem 

app.get('/usuarios',function(req,resp){
    const usuarios = Usuario.findAll().then(function(usuarios){
        resp.send(usuarios)
    })
})

// por id 

app.get('/usuarios/:id',function(req,resp){
    const usuarios = Usuario.findAll({where:{'id':req.params.id}}).then(function(usuarios){
        resp.send(usuarios)
    })
})

// delete

app.delete('/usuarios/:id',function(req,resp){
    const usuarios = Usuario.destroy({where:{'id':req.params.id}}).then(function(){
        resp.send('Usuario deletado com sucesso')
    }).catch(function(erro){
        resp.send('Este usuario nao existe')
    })
})

// update 

app.put('/usuarios/:id',function(req,resp){
    const usuarios = Usuario.update({
        nome:req.body.nome,
        sobrenome:req.body.sobrenome,
        funcao:req.body.funcao,
        salario:req.body.salario
    },{where:{'id':req.params.id}}).then(function(){
        resp.send('Usuario atualizado com sucesso')
    }).catch(function(erro){
        resp.send('Este usuario nao existe')
    })
})

app.listen(8080,function(){
    console.log('Servidor rodando na url localhost:8080')
})