import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/Residential.svg";
// importa tus iconos
import EyeOpen from "../assets/visibility.svg";
import EyeClosed from "../assets/visibility_off.svg";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Lado izquierdo con logo */}
        <div className="login-logo">
          <img src={Logo} alt="Residential Logo" className="logo-img" />
        </div>

        {/* Formulario */}
        <div className="login-form">
          <h2>Iniciar Sesión</h2>

          {/* Número de cédula */}
          <div className="input-group">
            <label htmlFor="cedula">Número de cédula</label>
            <input
              type="text"
              id="cedula"
              placeholder="Ingresa tu número de cédula"
            />
          </div>

          {/* Contraseña */}
          <div className="input-group password-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? EyeClosed : EyeOpen}
                  alt="Mostrar/Ocultar contraseña"
                />
              </button>
            </div>
          </div>

          <button className="login-btn">Iniciar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
