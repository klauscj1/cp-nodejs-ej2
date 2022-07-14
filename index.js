//Verbos de http => GET,POST, PUT, DELETE, PATCH
//importamos el modulo cors
const cors = require("cors");
//importamos el modulo express
const express = require("express");
//importo y configuro las variable de entorno
require("dotenv").config();
//imortadmos la libreria para documentacion -> swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

//creamos un servidor
const server = express();
//creamos el objeto de configuracion de swagger

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST CURSO NODEJS",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

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

server.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerOptions))
);

server.use("/api/v1/notas", require("./routes/notas"));
server.use("/api/v1/usuarios", require("./routes/usuarios"));
server.use("/api/v1/auth", require("./routes/auth"));

//escuchar el servidor en el puerto PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
