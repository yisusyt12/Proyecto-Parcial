import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UsersPages from "./pages/UsersPages";
import TasksPages from "./pages/Taskspages";
import Login from "./pages/login";
import Register from "./pages/register"; 

function App() {
  const [usuarios, setUsuarios] = useState([]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <main className="py-6">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/users"
                element={<UsersPages usuarios={usuarios} setUsuarios={setUsuarios} />}
              />
              <Route
                path="/tasks"
                element={<TasksPages usuarios={usuarios} />}
              />
              <Route path="*" element={<Navigate to="/users" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
