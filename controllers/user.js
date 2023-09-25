// Importaciones
const validate = require("../helpers/validate");


// accion de prueba
const prueba = (req,res)=>{
    return res.status(200).send({
        status: 'succes',
        mesage: 'Mensaje enviado desde:controller/user.js'
    });
};

// Registrar usuarios
const register = (req,res)=>{
    // Recoger datos de la peticion
    let params = req.body;

    // Comprobar que me llegan bien
    if (!params.name || !params.nick || !params.email || !params.password) {
        
        return res.status(400).send({
            status: 'error',
            mesage: 'Faltan datos por enviar',
        });

    }

    // Validar los datos
    try {
        validate(params);
        
    } catch (error) {
        
        return res.status(400).send({
            status: 'error',
            mesage: 'Validacion no superada',
        });
    }

    // Controlar usuarios duplicados

    // Cifrar la password

    // Crear objeto del usuario

    // Guaradar usuario en la bd

    // Limpiar el objeto a devolver

    // Devolver un resultado

    return res.status(200).send({
        status: 'succes',
        mesage: 'Metodo de registro',
        params
    })
};

// exportar accciones
module.exports = {
    prueba,
    register
}