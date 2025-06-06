import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const  token = localStorage.getItem("token");
  if (!token) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");   
  };
  


  return (
    <nav
      style={{
        backgroundColor: "#000",
        padding: "1rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
        <NavLink
          to="/users"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            backgroundColor: isActive ? "#007BFF" : "#333",
            color: isActive ? "#fff" : "#ccc",
            fontWeight: "bold",
            transition: "background-color 0.3s, color 0.3s",
          })}
        >
          Lista de Usuarios
        </NavLink>
        <NavLink
          to="/tasks"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            backgroundColor: isActive ? "#007BFF" : "#333",
            color: isActive ? "#fff" : "#ccc",
            fontWeight: "bold",
            transition: "background-color 0.3s, color 0.3s",
          })}
        >
          Lista de Tareas
        </NavLink>

       
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
        >
          Cerrar sesión
        </button>
        
      </div>
    </nav>
  );
}
