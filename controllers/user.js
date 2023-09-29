// Importaciones
const validate = require("../helpers/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");


// accion de prueba
const prueba = (req, res) => {
    return res.status(200).send({
        status: 'succes',
        mesage: 'Mensaje enviado desde:controller/user.js'
    });
};

// Registrar usuarios
const register = async (req, res) => {
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
    try {

        // Control usuarios duplicados
        const userExists = await User.find({
            $or: [
                { email: params.email.toLowerCase() },
                { nick: params.nick.toLowerCase() },
            ]
        }).exec();

        if (userExists && userExists.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        };

        // Cifrar la contrasena 
        let pwd = await bcrypt.hash(params.password, 10,);
        params.password = pwd;


        // Crear objeto de usuario
        let user_to_save = new User(params);

        if (!user_to_save) {
            return res.status(500).json({
                status: "error",
                messaje: "Error al guardar el usuario",
            });
        } else {
            //Guardar usuario en la bbdd
            user_to_save.save();

            return res.status(200).json({
                status: "success",
                messaje: "Usuario guardado correctamente !!",
                user_to_save
            });
        }

    } catch (error) {

        return res.status(500).json({
            status: "error",
            message: "Error en la consulta de usuarios"
        });
    }

};

// exportar accciones
module.exports = {
    prueba,
    register
}