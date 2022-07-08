const pool = require("../database/database");

const buscarUsuarios = async () => {
  try {
    const usuariosQuery = await pool.query("select * from usuario", []);
    const { rows: usuarios } = usuariosQuery;
    return usuarios;
  } catch (error) {
    console.log("error en buscarUsuarios", error);
    return null;
  }
};

const buscarUsuarioPorId = async (usuId) => {
  try {
    const usuarioQuery = await pool.query("select * from usuario where id=$1", [
      usuId,
    ]);
    const { rows: usuarios } = usuarioQuery;
    return usuarios[0];
  } catch (error) {
    console.log("error en buscarUsuarioPorId", error);
    return null;
  }
};

const insertarUsuario = async (userToSave) => {
  try {
    const insertarUsuarioQuery = await pool.query(
      "INSERT INTO usuario(nombre, apellido) VALUES ($1, $2) returning id",
      [userToSave.nombre, userToSave.apellido]
    );
    const { rows } = insertarUsuarioQuery;
    return rows[0].id;
  } catch (error) {
    console.log("error en insertarUsuario", error);
    return null;
  }
};

const actualizarUsuario = async (id, userUpdate) => {
  try {
    const actualizarUsuarioQuery = await pool.query(
      "UPDATE usuario SET nombre=$1, apellido=$2 WHERE id=$3",
      [userUpdate.nombre, userUpdate.apellido, id]
    );
    const { rowCount } = actualizarUsuarioQuery;
    return rowCount;
  } catch (error) {
    console.log("error en actualizarUsuario", error);
    return null;
  }
};

const eliminarUsuario = async (id) => {
  try {
    const eliminarUsuarioQuery = await pool.query(
      "DELETE FROM usuario WHERE id=$1",
      [id]
    );
    const { rowCount } = eliminarUsuarioQuery;
    return rowCount;
  } catch (error) {
    console.log("error en eliminarUsuario", error);
    return null;
  }
};

module.exports = {
  buscarUsuarioPorId,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuarios,
};
