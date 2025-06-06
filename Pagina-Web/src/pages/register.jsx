import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `https://proyecto-parcial-ubn6.onrender.com/register/?name=Anon&email=${email}&password=${password}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Error desconocido");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fefce8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "2.5rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#1e293b" }}>
          Crear cuenta
        </h2>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", marginBottom: "1rem", textAlign: "center" }}>
              Registrado correctamente. Redirigiendo...
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#111827",
              color: "#fff",
              padding: "0.75rem",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Registrarse
          </button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.95rem", textAlign: "center" }}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" style={{ color: "#2563eb", fontWeight: "500" }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
