const Sequelize = require('sequelize')
const conexao = require('../db/bancoDeDados')

const Usuario = conexao.define('usuarios',{
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
    sobrenome:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Campo sobrenome não pode ser vazio'
            },notNull:{
                msg:'Campo sobrenome não pode ser nulo'
            }
        }
    },
    funcao:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Campo função não pode ser vazio'
            },notNull:{
                msg:'Campo função não pode ser nulo'
            }
        }
    },
    salario:{
        type:Sequelize.DOUBLE,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Campo salário não pode ser vazio'
            }
        }
    }
})

// Usuario.sync({force:true})

module.exports = Usuario