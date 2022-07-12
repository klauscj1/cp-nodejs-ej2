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

const getAllUsuarios = async (req, res = response) => {
  try {
    const usuarios = await buscarUsuarios();
    if (!usuarios) {
      return res.status(500).send({
        message: "PROBLEMAS EN EL SERVIDOR",
      });
    }
    res.status(200).send(usuarios);
  } catch (error) {
    console.log("error en getAllUsuarios", error);
    return res.status(500).send({
      message: "PROBLEMAS EN EL SERVIDOR",
    });
  }
};

const getUsuarioPorId = async (req, res = response) => {
  const { id } = req.params;
  try {
    const userId = parseInt(id);
    const usuario = await buscarUsuarioPorId(userId);
    if (usuario) {
      return res.status(200).send(usuario);
    } else {
      return res.status(404).send({
        error: "No existe un usuario con ese id",
      });
    }
  } catch (e) {
    console.log("error en getUsuarioPorId", error);
    return res.status(500).send({
      message: "PROBLEMAS EN EL SERVIDOR",
    });
  }
};

const postUsuario = async (req, res = response) => {
  try {
    const userToSave = req.body;
    const userSavedId = await insertarUsuario(userToSave);
    if (!userSavedId) {
      return res.status(500).send({
        message: "PROBLEMAS EN EL SERVIDOR",
      });
    }
    const userSaved = await buscarUsuarioPorId(userSavedId);
    res.status(201).send(userSaved);
  } catch (error) {
    console.log("error en postUsuario", error);
    return res.status(500).send({
      message: "PROBLEMAS EN EL SERVIDOR",
    });
  }
};

const putUsuario = async (req, res = response) => {
  try {
    const { usuId } = req.params;
    const userToUpdate = req.body;
    const userFind = await buscarUsuarioPorId(usuId);
    if (!userFind) {
      return res.status(404).send({
        error: "No existe un usuario con ese id " + usuId,
      });
    }
    userFind.nombre = userToUpdate.nombre;
    userFind.apellido = userToUpdate.apellido;
    userFind.password = userToUpdate.password;
    const userUpdated = await actualizarUsuario(usuId, userFind);
    console.log("userUpdated", userUpdated);
    if (!userUpdated) {
      return res.status(500).send({
        message: "PROBLEMAS EN EL SERVIDOR",
      });
    }
    res.status(200).send(userFind);
  } catch (error) {
    console.log("error en putUsuario", error);
    return res.status(500).send({
      message: "PROBLEMAS EN EL SERVIDOR",
    });
  }
};

const deleteUsuario = async (req, res = response) => {
  try {
    const { id } = req.params;
    const userFind = await buscarUsuarioPorId(id);
    if (!userFind) {
      return res.status(404).send({
        error: "No existe un usuario con ese id " + id,
      });
    }
    const respDeleteNota = await eliminarUsuario(id);
    if (!respDeleteNota) {
      return res.status(500).send({
        message: "PROBLEMAS EN EL SERVIDOR",
      });
    }
    res.status(200).send();
  } catch (error) {
    console.log("error en deleteUsuario", error);
    return res.status(500).send({
      message: "PROBLEMAS EN EL SERVIDOR",
    });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioPorId,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
