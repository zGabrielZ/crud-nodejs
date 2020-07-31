const express = require('express')
const rota = express.Router()
const Usuario = require('../modelo/Usuario')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const auth = require('../middleware/auth')

// rota para inserir 

rota.post('/usuarios/inserir',auth,async(req,res)=>{
    let {nome,sobrenome,funcao,salario} = req.body

    await Usuario.create({nome,sobrenome,funcao,salario})
        .then(usuarios=>{
            res.status(201).send(usuarios)
        }).catch(erro=>{
            res.status(400).send({error:erro})
        })


})

// rota para atualizar 

rota.put('/usuarios/:id',auth,async(req,res)=>{
    let id = req.params.id
    let {nome,sobrenome,funcao,salario} = req.body

    if(isNaN(id)){
        res.status(400).send({messagem:'Isso não é um numero'})
    }


    await Usuario.findOne({where:{id:id}})
        .then(usuarios=>{
            if(!usuarios){
                res.status(404).send({messagem:'Usuário não encontrado'})
            } else {
                Usuario.update({nome,sobrenome,funcao,salario},{where:{id:id}})
                res.status(204).send({messagem:'Jogo atualizado com sucesso'})
            }
        }).catch(erro=>{
            res.status(400).send({error:erro})
        })

})

// rota para deletar 

rota.delete('/usuarios/:id',auth,async(req,res)=>{
    let id = req.params.id

    if(isNaN(id)){
        res.status(400).send({messagem:'Isso não é um numero'})
    }


    Usuario.findOne({where:{id:id}})
        .then(usuarios=>{
            if(usuarios==null){
                res.status(404).send({messagem:'Usuário não encontrado'})
            } else {
                Usuario.destroy({where:{id:id}})
                    .then(usuarios=>{
                        res.status(204).send({messagem:'Usuário deletado'})
                    })
            }
        }).catch(erro=>{
            res.status(400).send({messagem:'Ocorreu um erro : '+erro})
        })

})

// rota para listagem 

rota.get('/usuarios',auth,async(req,res)=>{

    await Usuario.findAll({
        raw: true, order: [
            ['createdAt', 'DESC']
        ]
    }).then(usuarios=>{
        if(usuarios == ''){
            res.status(404).send({messagem:'Lista de usuários vazia'})
        } else {
            res.status(200).send(usuarios)
        }
    }).catch(erro=>{
        res.status(400).send({messagem:'Ocorreu um erro : '+erro})
    })
})

// rota para buscar id 

rota.get('/usuarios/:id',auth,async(req,res)=>{
    let id = req.params.id
    if(isNaN(id)){
        res.status(400).send({messagem:'Isso não é um numero'})
    }

    await Usuario.findOne({where:{id:id}})
        .then(usuarios=>{
            if(usuarios ==null){
                res.status(404).send({messagem:'Usuário não encontrado'})
            } else {
                res.status(200).send(usuarios)
            }
        }).catch(erro=>{
            res.status(400).send({messagem:'Ocorreu um erro : '+erro})
        })

})

// rota para procurar 

rota.post('/usuarios',auth,async(req,res)=>{
    
    let pesquisar = req.query.funcao
    let query = '%' + pesquisar + '%'
    
    await Usuario.findAll({
        where: { funcao: { [Op.like]: query } }, raw: true, order: [
            ['createdAt', 'DESC']
        ]
    }).then(usuarios=>{
        if(usuarios == ''){
            res.status(404).send({messagem:'Não foi encontrado nenhum usuário com esta função'})
        } else {
            res.status(200).send(usuarios)
        }
    }).catch(erro=>{
        res.status(400).send({messagem:'Ocorreu um erro : '+erro})
    })
})


module.exports = rota