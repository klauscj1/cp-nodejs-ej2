const pool = require("../database/database");

let notas = [
  { id: 1, title: "Note 1", description: "Description note 1" },
  { id: 2, title: "Note 2", description: "Description note 2" },
];

const buscarNotas = async () => {
  try {
    const notasQuery = await pool.query("select * from nota", []);
    const { rows: notas } = notasQuery;
    return notas;
  } catch (error) {
    console.log("error en buscarNotas", error);
    return null;
  }
};

const buscarNotaPorId = (noteId) => {
  const note = notas.find((note) => note.id === noteId);
  return note;
};

const insertarNota = (noteToSave) => {
  notas.push(noteToSave);
  return noteToSave;
};

const actualizarNota = (id, noteUpdate) => {
  let noteFind = notas.find((note) => note.id === parseInt(id));
  if (noteFind) {
    noteFind.title = noteUpdate.title;
    noteFind.description = noteUpdate.description;
    notas.map((note) => {
      if (note.id === noteFind.id) {
        return noteFind;
      }
      return note;
    });
    return noteFind;
  } else {
    return null;
  }
};

const eliminarNota = (id) => {
  const noteId = parseInt(id);
  const newNotes = notas.filter((note) => note.id !== noteId);
  notas = newNotes;
};

module.exports = {
  buscarNotaPorId,
  insertarNota,
  actualizarNota,
  eliminarNota,
  buscarNotas,
};
