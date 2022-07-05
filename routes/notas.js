//importacion del objeto Router
const { Router } = require("express");

//importaciones de funciones del controlador de notas
const {
  getAllNotas,
  getNotaPorId,
  postNota,
  putNota,
  deleteNota,
} = require("../controllers/notas");

//creacion del router de notas
const router = Router();

//CRUD ENDPOINT= http:localhost:3000/notas

// agregar endpoint GET principal=> http:localhost:3000/notas/
//recuperar todas las notas existentes
router.get("/", getAllNotas);

//agregar endpoint GET con id => http:localhost:3000/notas/:id
//recuperar el detalle de una sola nota mediante el id
router.get("/:id", getNotaPorId);

//agregar endpoint POST con id => http:localhost:3000/notas
//crear una nueva nota
router.post("/", postNota);

//agregar endpoint PUT con id => http:localhost:3000/notas
//ACTUALIZAR UNA NOTA
router.put("/:id", putNota);

//agregar endpoint DELETE con id => http:localhost:3000/notas
//ELIMINAR UNA NOTA
router.delete("/:id", deleteNota);

//exportamos el objeto router
module.exports = router;
