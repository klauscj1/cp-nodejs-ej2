const pool = require("../database/database");

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

const buscarNotasByUserId = async (usuarioId) => {
  try {
    const notasQuery = await pool.query(
      "select * from nota where usuario_id=$1",
      [usuarioId]
    );
    const { rows: notas } = notasQuery;
    return notas;
  } catch (error) {
    console.log("error en buscarNotasByUserId", error);
    return null;
  }
};

const buscarNotaPorId = async (noteId) => {
  try {
    const notaQuery = await pool.query("select * from nota where id=$1", [
      noteId,
    ]);
    const { rows: notas } = notaQuery;
    return notas[0];
  } catch (error) {
    console.log("error en buscarNotaPorId", error);
    return null;
  }
};

const insertarNota = async (noteToSave) => {
  try {
    const newNotaQuery = await pool.query(
      "INSERT INTO nota(title, description,usuario_id) VALUES ($1,$2,$3) returning id",
      [noteToSave.title, noteToSave.description, noteToSave.usuarioId]
    );
    const { rows: notasInsertadas } = newNotaQuery;
    return notasInsertadas[0].id;
  } catch (error) {
    console.log("error en insertarNota", error);
    return null;
  }
};

const actualizarNota = async (id, noteUpdate) => {
  try {
    const updateNotaQuery = await pool.query(
      "UPDATE nota SET title=$1, description=$2 where id=$3",
      [noteUpdate.title, noteUpdate.description, id]
    );
    return updateNotaQuery.rowCount;
  } catch (error) {
    console.log("error en actualizarNota", error);
    return null;
  }
};

const eliminarNota = async (id) => {
  try {
    const deleteQuery = await pool.query("DELETE FROM nota where id=$1", [id]);
    return deleteQuery.rowCount;
  } catch (error) {
    console.log("error en eliminarNota", error);
    return null;
  }
};

module.exports = {
  buscarNotaPorId,
  insertarNota,
  actualizarNota,
  eliminarNota,
  buscarNotas,
  buscarNotasByUserId,
};
