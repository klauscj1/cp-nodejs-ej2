//importacion de response para tener ayudar en el editor
const { response } = require("express");

//importacion de metodos del repositorio de notas
const {
  buscarNotas,
  buscarNotaPorId,
  insertarNota,
  actualizarNota,
  eliminarNota,
} = require("../repositories/notas_repository");

//metodos para el control de las req y res de notas

const getAllNotas = async (req, res = response) => {
  const notas = await buscarNotas();
  if (!notas) {
    return res.status(500).send({
      message: "PROBLEMAS EN EL SERVIDOR",
    });
  }
  res.status(200).send(notas);
};

const getNotaPorId = (req, res = response) => {
  const { id } = req.params;
  try {
    const noteId = parseInt(id);
    const note = buscarNotaPorId(noteId);
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

const postNota = (req, res = response) => {
  const noteToSave = req.body;
  const noteCompleteToSave = {
    ...noteToSave,
    id: new Date().getTime(),
  };
  const noteSaved = insertarNota(noteCompleteToSave);
  res.status(201).send(noteSaved);
};

const putNota = (req, res = response) => {
  const { idNota } = req.params;
  const noteToUpdate = req.body;
  const noteUpdated = actualizarNota(idNota, noteToUpdate);
  if (!noteUpdated) {
    return res.status(404).send({
      error: "No existe una nota con este id",
    });
  }
  res.status(200).send(noteUpdated);
};

const deleteNota = (req, res = response) => {
  const { id } = req.params;
  eliminarNota(id);
  res.status(200).send();
};

module.exports = {
  getAllNotas,
  getNotaPorId,
  postNota,
  putNota,
  deleteNota,
};
