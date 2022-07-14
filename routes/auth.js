//importacion del objeto Router
const { Router } = require("express");
//importamos el objeto check para las validaciones
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
//creacion del router de notas
const router = Router();

/**
 * @swagger
 * /api/v1/auth:
 *    post:
 *            description: Login del usuario
 *            responses:
 *                '200':
 *                    description: La respuesta fue buena
 *            requestBody:
 *                  required: true
 *                  content:
 *                    application/json:
 *                      schema:
 *                        type: object
 *                        required:
 *                          - email
 *                          - password
 *                        properties:
 *                          email:
 *                            type: string
 *                          password:
 *                            type: string
 */
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
