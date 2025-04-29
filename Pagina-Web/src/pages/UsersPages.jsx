import { useState } from "react";


function UsersPages({usuarios, setUsuarios}){

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [editingId, setEditingId] = useState(null);

  
  const handleSubmit = () => {
    
    if (!nombre.trim() || !correo.trim()) return;

    const payload = {
      nombre: nombre.trim(),
      correo: correo.trim(),
    };

    if (editingId) {
      
      setUsuarios(usuarios.map(u =>
        u.id === editingId ? { ...u, ...payload } : u
      ));
    } else {
      
      setUsuarios([
        ...usuarios,
        { id: Date.now(), ...payload }
      ]);
    }

    
    setNombre("");
    setCorreo("");
    setEditingId(null);
  };

  
  const eliminarUsuario = (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

 
  const editarUsuario = (usuario) => {
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setEditingId(usuario.id);
  };

  return (
    <div  style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
    <div style={{ textAlign: "center", padding: "1rem",} }>
      <h1>Gestión de usuarios</h1>
      </div>
      <div style={{  textAlign: "center", marginBottom: "1rem" }}>
        <input 
        
        style={{color: "black",
          marginLeft: "1rem",
          padding: "0.5rem",
        }}
         name="text"
          class="input"
          type="text"
          placeholder="Nombre"
          
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          
        />
        <input
        style={{color: "black",
           marginLeft: "1rem",
          padding: "0.5rem",
        }}
          name="email"
          class="input"
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
        />

      
        <button 
        style={{  marginLeft: "1rem",
          padding: "0.9rem",}}
        onClick={handleSubmit}>
          <span class="circle1"></span>
    <span class="circle2"></span>
    <span class="circle3"></span>
    <span class="circle4"></span>
    <span class="circle5"></span>

          {editingId ? "Guardar cambios" : "Agregar Usuario"}
        </button>
      </div>
   
      <div style={{display: "flex", justifyContent: "center",}}>
      <table 
       class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      border={1} cellPadding={25}>
        <thead
         class= "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tr>
             <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th> 
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td  >
                
                <button 
                onClick={() => editarUsuario(usuario)}>
                  Editar
                </button>
                
                <button onClick={() => eliminarUsuario(usuario.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );

  
}

export default UsersPages;
