// Importaciones
const validate = require("../helpers/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../helpers/jwt");


// accion de prueba
const prueba = (req, res) => {
    return res.status(200).send({
        status: 'success',
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
            // li,piar el objeto para no devolver info sencible
            let userCreated = user_to_save.toObject();
            delete userCreated.password;
            delete userCreated.role;

            return res.status(200).json({
                status: "success",
                messaje: "Usuario guardado correctamente !!",
                user: userCreated
            });
        }

    } catch (error) {

        return res.status(500).json({
            status: "error",
            message: "Error en la consulta de usuarios"
        });
    }

};

// Logearse como usuario
const login = (req, res) => {
    // Recoger los parametros de la peticion
    let params = req.body;

    // Comprobar que me llegan
    if (!params.email || !params.password) {

        return res.status(400).send({
            status: 'error',
            mesage: 'Faltan datos por enviar'
        });
    }

    // Buscar en la bd si existe el usuario
    User.findOne({ email: params.email })
        .then((user) => {

            if (!user) {

                return res.status(400).send({
                    status: 'error',
                    mesage: 'No existe el usuario'
                });
            };

            // Comprobar su password
            const pwd = bcrypt.compareSync(params.password, user.password);
            if (!pwd) {

                return res.status(400).send({
                    status: 'error',
                    mesage: 'Login incorrecto'
                });
            };

            // limpiar objeto (quitar info que no se debe visualizar)
            let identityUser = user.toObject();
            delete identityUser.password;
            delete identityUser.email;
            delete identityUser.role;
            delete identityUser.__v;

            // Conseguir token jwt (crear un servicio que nos permita crear el token)
            const token = jwt.createToken(user);

            // Devolver datos de usuario y token
            return res.status(200).send({
                status: 'success',
                mesage: 'Metodo de login',
                token,
                user: identityUser
            });

        }).catch((error) => {

            return res.status(404).send({
                status: 'error',
                mesage: 'Ocurrio un error al buscar usuarios'
            });
        });

};

const profile = (req, res) => {
    // Recoger id de usuario url
    const id = req.params.id;

    // Consulta para sacar los datos del perfil
    User.findById(id)
        .then((user) => {

            if (!user) {

                return res.status(404).send({
                    status: 'error',
                    mesage: 'El usuario no existe',
                });
            };
            
            // Devovert resultado
            return res.status(200).send({
                status: 'success',
                mesage: 'Metodo profile',
                id,
                user
            });
        }).catch((err) => {

            return res.status(400).send({
                status: 'success',
                mesage: 'Algo salio mal',
            });
        });

}

// exportar accciones
module.exports = {
    prueba,
    register,
    login,
    profile
}