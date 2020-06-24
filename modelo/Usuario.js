const db = require('../db/bancoDeDados')

const Usuario = db.sequelize.define('tab_usuario',{
    nome:{
        type:db.Sequelize.STRING
    },
    sobrenome:{
        type:db.Sequelize.STRING
    },
    funcao:{
        type:db.Sequelize.STRING
    },
    salario:{
        type:db.Sequelize.DOUBLE
    }
})

// Usuario.sync({force:true})

module.exports = Usuario