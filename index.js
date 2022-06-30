//Verbos de http => GET,POST, PUT, DELETE, PATCH

//importamos el modulo express
const express = require("express");
//creamos un servidor
const server = express();
//puerto para el servidor
const PORT = 3000;

// agregar endpoint principal=> http:localhost:3000/
server.get("/", (req, res) => {
  res.status(200).send({
    saludo: "Hola",
  });
});

//http:localhost:3000/saludo
server.get("/saludo", (req, res) => {
  res.status(200).send({
    saludo: "Hola como estas",
  });
});

server.post("/saludo", (req, res) => {
  res.status(200).send({
    saludo: "Hola como estas",
  });
});

//escuchar el servidor en el puerto PORT
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
