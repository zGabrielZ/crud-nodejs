const Sequelize = require('sequelize')
const conexao = new Sequelize('meuapp','root','gabriel',{
    host:'localhost',
    dialect:'mysql',
    timezone:'-03:00'
})

module.exports = conexao