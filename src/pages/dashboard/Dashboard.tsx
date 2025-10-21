import React, { useState } from "react";
import { Home, Building2, LogOut, Users } from "lucide-react";
import "../../components/styles/Dashboard.css";
import "../../components/styles/Asambleas.css";
import "../../components/styles/Casas.css";
import Asambleas from "./Asambleas";
import Casas from "./Casas";
import Usuarios from "./Usuarios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("asambleas");

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="dashboard-container">
      <header className="topbar">
        <h2>
          {activeTab === "asambleas"
            ? "Asambleas"
            : activeTab === "casas"
            ? "Casas"
            : "Usuarios"}
        </h2>
      </header>

      <aside className="sidebar glass">
        <ul className="menu">
          <li
            className={`menu-item ${
              activeTab === "asambleas" ? "active" : ""
            }`}
            onClick={() => setActiveTab("asambleas")}
          >
            <Building2 className="icon" /> Asambleas
          </li>

          <li
            className={`menu-item ${activeTab === "casas" ? "active" : ""}`}
            onClick={() => setActiveTab("casas")}
          >
            <Home className="icon" /> Casas
          </li>

          <li
            className={`menu-item ${activeTab === "usuarios" ? "active" : ""}`}
            onClick={() => setActiveTab("usuarios")}
          >
            <Users className="icon" /> Usuarios
          </li>
        </ul>

        <div className="bottom-section">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut className="icon" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* === Contenido principal === */}
      <main className="main-content glass">
        {activeTab === "asambleas" && <Asambleas />}
        {activeTab === "casas" && <Casas />}
        {activeTab === "usuarios" && <Usuarios />}
      </main>
    </div>
  );
};

export default Dashboard;
