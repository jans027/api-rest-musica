// accion de prueba
const prueba = (req,res)=>{
    return res.status(200).send({
        status: 'succes',
        mesage: 'Mensaje enviado desde:controller/artist.js'
    })
}

// exportar accciones
module.exports = {
    prueba
}