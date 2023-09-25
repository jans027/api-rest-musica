// accion de prueba
const prueba = (req,res)=>{
    return res.status(200).send({
        status: 'succes',
        mesage: 'Mensaje enviado desde:controller/user.js'
    })
}

// exportar accciones
module.exports = {
    prueba
}