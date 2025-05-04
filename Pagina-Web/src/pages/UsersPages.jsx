import { useState, useEffect } from "react";
import { fetchData, postData } from "../Services/API";

function UsersPages({ usuarios, setUsuarios }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [editingId, setEditingId] = useState(null);

  
  useEffect(() => {
    fetchData("/users/")
      .then(data => setUsuarios(data))
      .catch(error => console.error("Error al cargar usuarios:", error));
  }, [setUsuarios]);

  const handleSubmit = async () => {
    if (!nombre.trim() || !correo.trim()) return;

    const payload = {
      name: nombre.trim(), 
      email: correo.trim(), 
    };

    try {
      const newUser = await postData("/users/", payload);
      setUsuarios([...usuarios, newUser]);
      setNombre("");
      setCorreo("");
      setEditingId(null);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <h1>Gestión de usuarios</h1>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <input
          style={{ color: "black", marginLeft: "1rem", padding: "0.5rem" }}
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          style={{ color: "black", marginLeft: "1rem", padding: "0.5rem" }}
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <button
          style={{ marginLeft: "1rem", padding: "0.9rem" }}
          onClick={handleSubmit}
        >
          {editingId ? "Guardar cambios" : "Agregar Usuario"}
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table border={1} cellPadding={25}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>
                  <button onClick={() => editarUsuario(usuario)}>Editar</button>
                  {/* Eliminar desde backend aún no está implementado */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function editarUsuario(usuario) {
    setNombre(usuario.name);
    setCorreo(usuario.email);
    setEditingId(usuario.id);
  }
}

export default UsersPages;


