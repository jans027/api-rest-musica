//importaciones modelos
const Artist = require("../models/artist");




// accion de prueba
const prueba = (req, res) => {
    return res.status(200).send({
        status: 'succes',
        mesage: 'Mensaje enviado desde:controller/artist.js'
    })
};

// Accion de guardar artista
const save = (req, res) => {
    // Recoger datos del body
    let params = req.body;

    // Crear el objeto a guardar
    let artist = new Artist(params);

    // guardarlo
    artist.save()
        .then((artistStored) => {

            if (!artistStored) {

                return res.status(400).send({
                    status: 'error',
                    message: 'No se ha guardado el artista',
                })
            };

            return res.status(200).send({
                status: 'succes',
                message: 'Artista guardado con exito',
                artist: artistStored
            })
        }).catch((err) => {

        });

};

// Accion mostrar un artista
const one = (req, res) => {

    return res.status(200).send({
        status: 'succes',
        message: 'Artista guardado con exito',
    })
}

// exportar accciones
module.exports = {
    prueba,
    save
}