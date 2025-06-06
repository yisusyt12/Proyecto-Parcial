import { useState, useEffect } from "react";
import { fetchData, postData } from "./../Services/API.js";
import api from "./../Services/API.js";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function TasksPages({ usuarios }) {
  const [tareas, setTareas] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [status, setStatus] = useState("pending");
  const [editingId, setEditingId] = useState(null);

  const cargarTareas = async () => {
    try {
      const data = await fetchData("/tasks/");
      setTareas(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !status || !assignedUser) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      status,
      user_id: Number(assignedUser),
    };

    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, payload);
      } else {
        await postData(`/users/${assignedUser}/tasks/`, payload);
      }

      await cargarTareas();
      setTitle("");
      setDescription("");
      setAssignedUser("");
      setStatus("pending");
      setEditingId(null);
    } catch (error) {
      console.error("Error guardando tarea:", error);
    }
  };

  const eliminarTarea = async (id) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      await cargarTareas(); 
    } catch (err) {
      console.error("Error eliminando tarea:", err);
    }
  };

  const editarTarea = (tarea) => {
    setTitle(tarea.title);
    setDescription(tarea.description);
    setAssignedUser(tarea.user_id?.toString() || "");
    setStatus(tarea.status);
    setEditingId(tarea.id);
  };

  const [columnDefs] = useState([
    { headerName: "Título", field: "title", sortable: true, filter: true, flex: 1, rowGroup: true },
    { headerName: "Descripción", field: "description", sortable: true, filter: true, flex: 2, rowGroup: true},
    {
      headerName: "Asignado a",
      field: "user_id",
      flex: 1,
      valueGetter: (params) => {
        const user = usuarios.find(u => u.id === params.data.user_id);
        return user ? user.name : "—";
      },
    },
    { headerName: "Estado", field: "status", sortable: true, filter: true, flex: 1 },
    {
      headerName: "Acciones",
      field: "acciones",
      flex: 1,
      minWidth: 180,
      cellRenderer: (params) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
          <button
            onClick={() => editarTarea(params.data)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#black",
              color: "#fff",
              border: "none",
              borderRadius: "6rem",
              cursor: "pointer",
            }}
          >
            Editar
          </button>
          <button
            onClick={() => eliminarTarea(params.data.id)}
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

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <h1>Gestión de tareas</h1>
      </div>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <input
          style={{ borderRadius: "6rem", border: "black", color: "black", marginLeft: "1rem", padding: "0.5rem" }}
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          style={{ borderRadius: "6rem", color: "black", marginLeft: "1rem", padding: "0.5rem" }}
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select
          style={{borderRadius: "6rem", color: "black", marginLeft: "1rem", padding: "0.5rem" }}
          value={assignedUser}
          onChange={e => setAssignedUser(e.target.value)}
        >
          <option value="">Sin asignar</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <select
          style={{ borderRadius: "6rem", color: "black", marginLeft: "1rem", padding: "0.5rem" }}
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="pending">Pendiente</option>
          <option value="in progress">En progreso</option>
          <option value="done">Hecho</option>
        </select>
        <button
          style={{ borderRadius: "6rem", marginLeft: "1rem", padding: "0.8rem" }}
          onClick={handleSubmit}
        >
          {editingId ? "Guardar cambios" : "Agregar Tarea"} 
        </button>
          {editingId && (
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setDescription("");
              setAssignedUser("");
              setStatus("pending");
              setEditingId(null);
            }}
            style={{borderRadius: "6rem", marginLeft: "1rem", padding: "0.9rem", backgroundColor: "#d32f2f", color: "#fff" }}
          >
            Cancelar
          </button>
        )}
      </div>

      <div className="ag-theme-alpine" style={{
        height: "auto",
        width: "98%",
        maxWidth: "1400px",
        margin: "1rem auto",
        borderRadius: "11px",
        overflow: "hidden",
        padding: "1rem", 
        backgroundColor: "#fff",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        justifyContent: "center",
      }}>
        <AgGridReact
          rowData={tareas}
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

export default TasksPages;
