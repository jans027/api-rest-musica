// Importar modulos
const jwt = require('jwt-simple');
const moment = require('moment');

// Importar clave secreta
const { secret } = require('../helpers/jwt');

// Crear middleware (metodo funcion)
exports.auth = (req, res, next) => {
    // Comprobar si llega la cabecera de auth
    if (!req.headers.authorization) {

        return res.status(403).send({
            status: 'error',
            mesage: 'La peticion no tiene la cabecera de autenticacion',
        });
    };

    // Limpiar token
    let token = req.headers.authorization.replace(/['"]+/g, "");

    try {

        // Decodificar el token
        let payload = jwt.decode(token, secret);

        // Comprobar la expiracion del token
        if (payload.exp <= moment().unix()) {
            
            return res.status(401).send({
                status: 'error',
                mesage: 'Token expirado',
                error
            });
        }
        // Agregar datos del usuario a la request
        req.user = payload;

    } catch (error) {

        return res.status(404).send({
            status: 'error',
            mesage: 'Token invalido',
            error
        });
    }

    // Pasar a la ejecucion de la accion
    next();
}
