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
    // Mostrar un artista
    const artistId = req.params.id;

    // Find
    Artist.findById(artistId)
        .then((artist) => {

            if (!artist) {
                return res.status(404).send({
                    status: 'succes',
                    message: 'No existe el artista',
                })
            };

            return res.status(200).send({
                status: 'succes',
                message: 'Artista encontrado',
                artist
            })

        }).catch((err) => {

        });


}

// exportar accciones
module.exports = {
    prueba,
    save,
    one
}