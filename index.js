//Verbos de http => GET,POST, PUT, DELETE, PATCH
//importamos el modulo cors
const cors = require("cors");
//importamos el modulo express
const express = require("express");
//creamos un servidor
const server = express();
//utilizamos middleware para json
server.use(express.json());
//utilizamos middleware para cors
server.use(cors());
//puerto para el servidor
const PORT = 4000;

let notas = [
  { id: 1, title: "Note 1", description: "Description note 1" },
  { id: 2, title: "Note 2", description: "Description note 2" },
];

// agregar endpoint GET principal=> http:localhost:3000/ => http:localhost:3000
//recuperar todas las notas existentes
server.get("/", (req, res) => {
  res.status(200).send(notas);
});

//agregar endpoint GET con id => http:localhost:3000/:id
//recuperar el detalle de una sola nota mediante el id
server.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const noteId = parseInt(id);
    const note = notas.find((note) => note.id === noteId);
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
});

//agregar endpoint POST con id => http:localhost:3000
//crear una nueva nota
server.post("/", (req, res) => {
  const noteToSave = req.body;
  const noteCompleteToSave = {
    ...noteToSave,
    id: notas.length + 1,
  };
  notas.push(noteCompleteToSave);
  console.log("noteCompleteToSave", noteCompleteToSave);
  res.status(201).send(noteCompleteToSave);
});

//agregar endpoint PUT con id => http:localhost:3000
//ACTUALIZAR UNA NOTA
server.put("/:id", (req, res) => {
  const { id } = req.params;
  const noteToUpdate = req.body;
  let noteFind = notas.find((note) => note.id === parseInt(id));
  noteFind.title = noteToUpdate.title;
  noteFind.description = noteToUpdate.description;
  let newNotes = notas.map((note) => {
    if (note.id === noteFind.id) {
      return noteFind;
    }
    return note;
  });
  res.status(200).send(noteFind);
});

//agregar endpoint DELETE con id => http:localhost:3000
//ELIMINAR UNA NOTA
server.delete("/:id", (req, res) => {
  const { id } = req.params;
  const noteId = parseInt(id);
  const newNotes = notas.filter((note) => note.id !== noteId);
  notas = newNotes;
  res.status(200).send();
});

//escuchar el servidor en el puerto PORT
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
