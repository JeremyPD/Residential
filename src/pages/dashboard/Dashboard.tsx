import React, { useState } from "react";
import { Home, Building2, LogOut } from "lucide-react";
import "./Dashboard.css";
import Asambleas from "./Asambleas";
import Casas from "./Casas";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("asambleas");

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="menu">
          <li
            className={`menu-item ${activeTab === "asambleas" ? "active" : ""}`}
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
        </ul>

        <div className="logout">
          <LogOut className="icon" />
          <span>Cerrar sesión</span>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <h2>{activeTab === "asambleas" ? "Asambleas" : "Casas"}</h2>
        </header>

        <main className="main-content">
          {activeTab === "asambleas" ? <Asambleas /> : <Casas />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
