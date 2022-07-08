//importacion del objeto Router
const { Router } = require("express");
//importamos el objeto check para las validaciones
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
//creacion del router de notas
const router = Router();
router.post(
  "/",
  [
    check("email", "El campo  email es obligatorio").isEmail(),
    check("password", "El campo password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
