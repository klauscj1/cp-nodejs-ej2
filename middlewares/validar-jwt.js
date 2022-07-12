const jwt = require("jsonwebtoken");
const validarToken = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      error: "No existe el token en la peticion",
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SEED);
    req.id = id;
    next();
  } catch (error) {
    console.log("error en validarToken", error);
    return res.status(401).json({
      error: "Token invalido",
    });
  }
};

module.exports = {
  validarToken,
};
