const Sequelize = require('sequelize')
const sequelize = new Sequelize('meuapp','root','gabriel',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}