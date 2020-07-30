const Sequelize = require('sequelize')
const conexao = require('../db/bancoDeDados')

const Admin = conexao.define('admins',{
    nome:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Campo nome não pode ser vazio'
            },notNull:{
                msg:'Campo nome não pode ser nulo'
            }
        }
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Campo email não pode ser vazio'
            },notNull:{
                msg:'Campo email não pode ser nulo'
            }
        }
    },
    senha:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Campo senha não pode ser vazio'
            },notNull:{
                msg:'Campo senha não pode ser nulo'
            }
        }
    }
})

// Admin.sync({force:true})

module.exports = Admin