//importacion del objeto Router
const { Router } = require("express");

//importaciones de funciones del controlador de usuarios
const {
  getAllUsuarios,
  getUsuarioPorId,
  postUsuario,
  putUsuario,
  deleteUsuario,
} = require("../controllers/usuarios");

//creacion del router de usuarios
const router = Router();

//CRUD ENDPOINT= http:localhost:3000/api/v1/usuarios

// agregar endpoint GET principal=> http:localhost:3000/usuarios/
//recuperar todas las usuarios existentes
router.get("/", getAllUsuarios);

//agregar endpoint GET con id => http:localhost:3000/usuarios/:id
//recuperar el detalle de una sola usuario mediante el id
router.get("/:id", getUsuarioPorId);

//agregar endpoint POST con id => http:localhost:3000/usuarios
//crear una nueva usuario
router.post("/", postUsuario);

//agregar endpoint PUT con id => http:localhost:3000/usuarios
//ACTUALIZAR UNA usuario
router.put("/:id", putUsuario);

//agregar endpoint DELETE con id => http:localhost:3000/usuarios
//ELIMINAR UNA usuario
router.delete("/:id", deleteUsuario);

//exportamos el objeto router
module.exports = router;
