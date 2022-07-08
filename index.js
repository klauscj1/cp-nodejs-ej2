//Verbos de http => GET,POST, PUT, DELETE, PATCH
//importamos el modulo cors
const cors = require("cors");
//importamos el modulo express
const express = require("express");
//importo y configuro las variable de entorno
require("dotenv").config();
const {
  buscarNotaPorId,
  insertarNota,
  actualizarNota,
  eliminarNota,
  buscarNotas,
} = require("./repositories/notas_repository");
//creamos un servidor
const server = express();
//utilizamos middleware para json
server.use(express.json());
//utilizamos middleware para cors
server.use(cors());
//puerto para el servidor

//rutas del API REST
//http:localhost:3000/ => ENDPOINT PRINCIPAL API REST
server.get("/", (req, res) => {
  res.send("<h1>API REST - CURSO NODEJS</h1>");
});

server.use("/api/v1/notas", require("./routes/notas"));
server.use("/api/v1/usuarios", require("./routes/usuarios"));
server.use("/api/v1/auth", require("./routes/auth"));

//escuchar el servidor en el puerto PORT

server.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
