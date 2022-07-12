const jwt = require("jsonwebtoken");

const generarToken = (usuario) => {
  return new Promise((resolve, reject) => {
    delete usuario.password;
    const payload = { ...usuario };
    jwt.sign(
      payload,
      process.env.JWT_SEED,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log("error en generarToken", error);
          reject("No se pudo gener el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generarToken,
};
