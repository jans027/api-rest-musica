// Importar mongoose
const mongoose = require("mongoose");

// Metodo de conexion
const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/app_musica")

        console.log("Conectado correctamente a la bd: app_musica ")
    } catch (error) {
        console.error(error);
        throw new Error("No se ha establecido la conexion a la bd!!")
    }
}

// Exportar conexion
module.exports = connection;