// Importar dependencias
const jwt = require('jwt-simple');
const moment = require('moment');
const {default: isEmail} = require('validator/lib/isEmail');

// Definir clave secreta
const secret = 'CLAVE_SECCRETA_de _MI_proyecto_de_la_API_musical_7498247928';

// Crear funcion para generar tokens
const createToken = (user) => {

    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    };

    // devolver token
    return jwt.encode(payload, secret);
}

// Exportar modulos
module.exports = {
    secret,
    createToken
};