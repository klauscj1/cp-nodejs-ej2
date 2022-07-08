const { generarToken } = require("../helpers/jwt");
const {
  buscarUsuarioPorEmail,
} = require("../repositories/usuarios_repository");

const login = async (req, res) => {
  const user = req.body;
  const userFind = await buscarUsuarioPorEmail(user.email);
  if (!userFind) {
    return res.status(404).send({
      error: "No se ha encontrado un registro con ese email",
    });
  }
  if (userFind.password !== user.password) {
    return res.status(400).send({
      error: "El password no coincide",
    });
  }
  const token = await generarToken(userFind);
  res.status(200).send({ token });
};

module.exports = {
  login,
};
