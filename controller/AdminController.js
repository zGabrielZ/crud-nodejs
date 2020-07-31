const express = require('express')
const rota = express.Router()
const Admin = require('../modelo/Admin')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')

const jwtSecret = 'aleatorio'

// rota para inserir 

rota.post('/admins/inserir', async (req, res) => {
    let { nome, email, senha } = req.body

    Admin.findOne({ where: { email: email } })
        .then(admins => {
            if (admins == undefined) {
                Admin.create({
                    nome,email,senha
                }).then(admins => {
                    res.status(201).send(admins)
                }).catch(erro => {
                    res.status(400).send({ error: erro })
                })
            } else {
                res.status(400).send({ messagem: 'Já existe este email' })
            }
        }).catch(erro => {
            res.status(400).send({ messagem: 'Ocorreu um erro : ' + erro })
        })


})


// rota para listagem 

rota.get('/admins',auth ,async (req, res) => {
    await Admin.findAll({
        raw: true, order: [
            ['createdAt', 'DESC']
        ]
    }).then(admins => {
        if (admins == '') {
            res.status(404).send({ messagem: 'Lista de admins vazia' })
        } else {
            res.status(200).send(admins)
        }
    }).catch(erro => {
        res.status(400).send({ messagem: 'Ocorreu um erro : ' + erro })
    })
})

// rota para buscar id 

rota.get('/admins/:id',auth ,async (req, res) => {
    let id = req.params.id
    if (isNaN(id)) {
        res.status(400).send({ messagem: 'Isso não é um numero' })
    }

    await Admin.findOne({ where: { id: id } })
        .then(admins => {
            if (admins == null) {
                res.status(404).send({ messagem: 'Admin não encontrado' })
            } else {
                res.status(200).send(admins)
            }
        }).catch(erro => {
            res.status(400).send({ messagem: 'Ocorreu um erro : ' + erro })
        })

})

// rota para autenticar 

rota.post('/admins/autenticar', async (req, res) => {
    let { email, senha } = req.body

    await Admin.findOne({ where: { email: email } })
        .then(admins => {
            if(admins !=undefined){
                let senhaCorreta = bcrypt.compareSync(senha,admins.senha)

                if(senhaCorreta){
                    jwt.sign(
                        {id:admins.id,nome:admins.nome,email:admins.email},
                        jwtSecret,{expiresIn:'48h'},(erro,token)=>{
                            if(erro){
                                res.status(400).json({erro:'Falha interna'})
                            } else {
                                res.status(200).json({token:token,id:admins.id,nome:admins.nome})
                            }
                        }
                    )
                } else {
                    res.status(400).send({error:'Senha inválida'})   
                }

            } else {
                res.status(400).send({error:'Email inválido'})
            }
        }).catch(erro => {
            res.status(400).send({ error: 'Ocorreu um erro : ' + erro })
        })

})



module.exports = rota