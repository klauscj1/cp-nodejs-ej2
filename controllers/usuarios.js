//importacion de response para tener ayudar en el editor
const { response } = require("express");

//importacion de metodos del repositorio de usuarios
const {
  buscarUsuarios,
  buscarUsuarioPorId,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../repositories/usuarios_repository");

//metodos para el control de las req y res de usuarios

const getAllUsuarios = (req, res = response) => {
  const usuarios = buscarUsuarios();
  res.status(200).send(usuarios);
};

const getUsuarioPorId = (req, res = response) => {
  const { id } = req.params;
  try {
    const userId = parseInt(id);
    const usuario = buscarUsuarioPorId(userId);
    if (usuario) {
      return res.status(200).send(usuario);
    } else {
      return res.status(404).send({
        error: "No existe un usuario con ese id",
      });
    }
  } catch (e) {
    return res.status(404).send({
      error: "El id ingresado como parametro debe ser numerico",
    });
  }
};

const postUsuario = (req, res = response) => {
  const userToSave = req.body;
  const userCompleteToSave = {
    ...userToSave,
    id: usuarios.length + 1,
  };
  const userSaved = insertarUsuario(userCompleteToSave);
  res.status(201).send(userSaved);
};

const putUsuario = (req, res = response) => {
  const { id } = req.params;
  const userToUpdate = req.body;
  const userUpdated = actualizarUsuario(id, userToUpdate);
  if (!userUpdated) {
    return res.status(404).send({
      error: "No existe un usuario con este id",
    });
  }
  res.status(200).send(noteUpdated);
};

const deleteUsuario = (req, res = response) => {
  const { id } = req.params;
  eliminarUsuario(id);
  res.status(200).send();
};

module.exports = {
  getAllUsuarios,
  getUsuarioPorId,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
