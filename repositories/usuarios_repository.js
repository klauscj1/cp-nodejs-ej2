let usuarios = [
  { id: 1, nombre: "Claus", apellido: "Chocho" },
  { id: 2, nombre: "Cris", apellido: "Cabrera" },
  { id: 3, nombre: "Gabo", apellido: "Cuenca" },
];

const buscarUsuarios = () => {
  return usuarios;
};

const buscarUsuarioPorId = (usuId) => {
  const usuario = usuarios.find((usuario) => usuario.id === usuId);
  console.log("usuario ", usuario);
  return usuario;
};

const insertarUsuario = (userToSave) => {
  usuarios.push(userToSave);
  return userToSave;
};

const actualizarUsuario = (id, userUpdate) => {
  let userFind = notas.find((user) => user.id === parseInt(id));
  if (userFind) {
    userFind.nombre = userUpdate.nombre;
    userFind.apellido = userUpdate.apellido;
    usuarios.map((user) => {
      if (user.id === userFind.id) {
        return userFind;
      }
      return user;
    });
    return userFind;
  } else {
    return null;
  }
};

const eliminarUsuario = (id) => {
  const userId = parseInt(id);
  const newUsers = usuarios.filter((user) => user.id !== userId);
  usuarios = newUsers;
};

module.exports = {
  buscarUsuarioPorId,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuarios,
};
