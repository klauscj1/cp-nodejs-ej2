//importacion del objeto Router
const { Router } = require("express");
//importamos el objeto check para las validaciones
const { check } = require("express-validator");
//importaciones de funciones del controlador de notas
const {
  getAllNotas,
  getNotaPorId,
  postNota,
  putNota,
  deleteNota,
} = require("../controllers/notas");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarToken } = require("../middlewares/validar-jwt");

//creacion del router de notas
const router = Router();

//CRUD ENDPOINT= http:localhost:3000/notas

// agregar endpoint GET principal=> http:localhost:3000/notas/
//recuperar todas las notas existentes
router.get("/", validarToken, getAllNotas);

//agregar endpoint GET con id => http:localhost:3000/notas/:id
//recuperar el detalle de una sola nota mediante el id
router.get("/:id", validarToken, getNotaPorId);

//agregar endpoint POST con id => http:localhost:3000/notas
//crear una nueva nota
router.post(
  "/",
  [
    validarToken,
    check("title", "El campo  title es obligatorio").not().isEmpty(),
    check("description", "El campo description es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postNota
);

//agregar endpoint PUT con id => http:localhost:3000/notas
//ACTUALIZAR UNA NOTA
router.put(
  "/:idNota",
  [
    validarToken,
    check("title", "El campo  title es obligatorio").not().isEmpty(),
    check("description", "El campo description es obligatorio").not().isEmpty(),
    check("id", "El campo id es necesario").not().isEmpty(),
    validarCampos,
  ],
  putNota
);

//agregar endpoint DELETE con id => http:localhost:3000/notas
//ELIMINAR UNA NOTA
router.delete("/:id", validarToken, deleteNota);

//exportamos el objeto router
module.exports = router;
