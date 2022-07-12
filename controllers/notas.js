//importacion de response para tener ayudar en el editor
const { response } = require("express");

//importacion de metodos del repositorio de notas
const {
  buscarNotaPorId,
  insertarNota,
  actualizarNota,
  eliminarNota,
  buscarNotasByUserId,
} = require("../repositories/notas_repository");
const { buscarUsuarioPorId } = require("../repositories/usuarios_repository");

//metodos para el control de las req y res de notas

const getAllNotas = async (req, res = response) => {
  try {
    const notas = await buscarNotasByUserId(req.id);
    if (!notas) {
      return res.status(500).send({
        message: "PROBLEMAS EN EL SERVIDOR",
      });
    }
    res.status(200).send(notas);
  } catch (error) {
    return res.status(500).send({
      error: "PROBLEMAS EN EL SERVIDOR",
    });
  }
};

const getNotaPorId = async (req, res = response) => {
  const { id } = req.params;
  try {
    const noteId = parseInt(id);
    const note = await buscarNotaPorId(noteId);
    if (note) {
      return res.status(200).send(note);
    } else {
      return res.status(404).send({
        error: "No existe una nota con ese id",
      });
    }
  } catch (e) {
    return res.status(404).send({
      error: "El id ingresado como parametro debe ser numerico",
    });
  }
};

const postNota = async (req, res = response) => {
  try {
    const noteToSave = req.body;
    const noteToSaveComplete = {
      ...noteToSave,
      usuarioId: req.id,
    };
    const noteSavedId = await insertarNota(noteToSaveComplete);
    if (!noteSavedId) {
      return res.status(500).send({
        error: "PROBLEMAS EN EL SERVIDOR",
      });
    }
    const notaInsertada = await buscarNotaPorId(noteSavedId);
    res.status(201).send(notaInsertada);
  } catch (error) {
    console.log("error en postNota", error);
    return res.status(500).send({
      error: "PROBLEMAS EN EL SERVIDOR",
    });
  }
};

const putNota = async (req, res = response) => {
  try {
    const { idNota } = req.params;
    const noteToUpdate = req.body;
    let noteFind = await buscarNotaPorId(idNota);
    if (!noteFind) {
      return res.status(404).send({
        error: "No se encontro una nota con el id " + idNota,
      });
    }
    noteFind.title = noteToUpdate.title;
    noteFind.description = noteToUpdate.description;
    const noteUpdated = await actualizarNota(idNota, noteFind);
    if (!noteUpdated) {
      return res.status(500).send({
        error: "PROBLEMAS EN EL SERVIDOR",
      });
    }
    res.status(200).send(noteFind);
  } catch (error) {
    console.log("error en putNota", error);
    return res.status(500).send({
      error: "PROBLEMAS EN EL SERVIDOR",
    });
  }
};

const deleteNota = async (req, res = response) => {
  try {
    const { id } = req.params;
    const noteToDelete = await buscarNotaPorId(id);
    if (!noteToDelete) {
      return res.status(404).send({
        error: "No se encontro una nota con el id " + id,
      });
    }
    const respDeleteNote = await eliminarNota(noteToDelete.id);
    if (!respDeleteNote) {
      return res.status(500).send({
        error: "PROBLEMAS EN EL SERVIDOR",
      });
    }
    res.status(200).send();
  } catch (error) {
    console.log("error en deleteNota", error);
    return res.status(500).send({
      error: "PROBLEMAS EN EL SERVIDOR",
    });
  }
};

module.exports = {
  getAllNotas,
  getNotaPorId,
  postNota,
  putNota,
  deleteNota,
};
