import { useState } from "react";

import api from "./../Services/API.js";

function TasksPages({ usuarios }) {
  const [tareas, setTareas] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [status, setStatus] = useState("todo");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      assignedUser: assignedUser || null,
      status,
    };

    if (editingId) {
      setTareas(tareas.map(t =>
        t.id === editingId ? { ...t, ...payload } : t
      ));
    } else {
      setTareas([...tareas, { id: Date.now(), ...payload }]);
    }

    setTitle("");
    setDescription("");
    setAssignedUser("");
    setStatus("todo");
    setEditingId(null);
  };

  const eliminarTarea = (id) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    setTareas(tareas.filter(t => t.id !== id));
  };

  const editarTarea = (tarea) => {
    setTitle(tarea.title);
    setDescription(tarea.description);
    setAssignedUser(tarea.assignedUser || "");
    setStatus(tarea.status);
    setEditingId(tarea.id);
  };

  return (
    <div style={{ padding: "2rem" }}>
      
      <div  style={{ textAlign: "center", padding: "1rem",   }}>
      <h1>Gestión de tareas</h1>
      </div>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <input
        style={{color: "black",
          marginLeft: "1rem",
          padding: "0.5rem",
        }}
        name="text"
          class="input"
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
        style={{color: "black",
          marginLeft: "1rem",
          padding: "0.5rem",
        }}
        name="text"
          class="input"
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select 
        style={{color: "black",
          marginLeft: "1rem",
          padding: "0.5rem",
        }}
          class="input"
          value={assignedUser}
          onChange={e => setAssignedUser(e.target.value)}
        >
          <option  class="input" 
          style={{color: "black",
            marginLeft: "1rem",
            padding: "0.5rem",
          }}
          value="">Sin asignar</option>
          {usuarios.map(u => (
            <option 
            style={{color: "black",}}
            key={u.id} value={u.id}>
              {u.nombre}
            </option>
          ))}
        </select>
        <select
        style={{color: "black",
          marginLeft: "1rem",
          padding: "0.5rem",
        }}
          name="text"
          class="input"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option 
          style={{color: "black",}}
          class="input" value="Pendiente">Pendiente</option>
          <option  style={{color: "black"}} class="input" value="in-progress">En progreso</option>
          <option  style={{color: "black"}} class="input" value="done">Hecho</option>
        </select>
        <button style={{  marginLeft: "1rem",
          padding: "0.8rem",}} onClick={handleSubmit}>
          {editingId ? "Guardar cambios" : "Agregar Tarea"}
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg"
       style={{ display: "flex", justifyContent: "center"}}>

        <table  class= "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" border={5} cellPadding={25}>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Asignado a</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>
                {t.assignedUser
                  ? usuarios.find(u => u.id === Number(t.assignedUser))?.nombre
                  : "—"}
              </td>
              <td>{t.status}</td>
              <td>
                <button onClick={() => editarTarea(t)}>
                <span class="circle1"></span>
    <span class="circle2"></span>
    <span class="circle3"></span>
    <span class="circle4"></span>
    <span class="circle5"></span>
                  Editar</button>
                <button onClick={() => eliminarTarea(t.id)}>
                <span class="circle1"></span>
    <span class="circle2"></span>
    <span class="circle3"></span>
    <span class="circle4"></span>
    <span class="circle5"></span>
                  Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default TasksPages;

export { api };