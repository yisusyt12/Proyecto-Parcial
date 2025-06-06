import { useEffect, useState } from "react";
import { fetchData, postData } from "../Services/API";
import api from "../Services/API";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function UsersPages({ usuarios, setUsuarios }) {
  const [editingId, setEditingId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  const cargarUsuarios = async () => {
    try {
      const data = await fetchData("/users/");
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const editarUsuario = (usuario) => {
    setNombre(usuario.name);
    setCorreo(usuario.email || "");
    setEditingId(usuario.id);
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    try {
      await api.delete(`/users/${id}`);
      await cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const [columnDefs] = useState([
    {
      headerName: "Nombre",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Correo",
      field: "email",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 180,
      flex: 1,
      cellRenderer: (params) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
          <button
            onClick={() => editarUsuario(params.data)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6rem",
              cursor: "pointer",
            }}
          >
            Editar
          </button>
          <button
            onClick={() => eliminarUsuario(params.data.id)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: "6rem",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nombre.trim();
    const email = correo.trim();

    if (!name || !email) return;

    const payload = { name, email };

    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, payload);
      } else {
        await postData("/users/", payload);
      }

      await cargarUsuarios();

      setNombre("");
      setCorreo("");
      setEditingId(null);
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <h1>Gestión de usuarios</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ textAlign: "center", marginBottom: "1rem" }}>
        <input
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ borderRadius: "6rem", color: "black", marginLeft: "1rem", padding: "0.5rem" }}
          type="text"
          placeholder="Nombre"
        />
        <input
          name="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{ borderRadius: "6rem", color: "black", marginLeft: "1rem", padding: "0.5rem" }}
          type="email"
          placeholder="Correo"
        />
        <button
          type="submit"
          style={{ borderRadius: "6rem", marginLeft: "1rem", padding: "0.8rem" }}
        >
          {editingId ? "Guardar cambios" : "Agregar Usuario"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setNombre("");
              setCorreo("");
              setEditingId(null);
            }}
            style={{
              borderRadius: "6rem",
              marginLeft: "1rem",
              padding: "0.9rem",
              backgroundColor: "#d32f2f",
              color: "#fff",
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="ag-theme-alpine" style={{
        height: "auto",
        width: "98%",
        maxWidth: "1400px",
        margin: "1rem auto",
        borderRadius: "11px",
        padding: "1rem",
        backgroundColor: "#fff",
        overflow: "hidden",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        justifyContent: "center",
      }}>
        <AgGridReact
          rowData={usuarios}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={5}
          domLayout="autoHeight"
          modules={[ClientSideRowModelModule]}
        />
      </div>
    </div>
  );
}

export default UsersPages;
