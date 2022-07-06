const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  //console.log("errores", errores);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores.mapped());
  }
  next();
};

module.exports = {
  validarCampos,
};
