import { useState, type ReactNode } from "react";
import "./Login.css";
import Logo from "../assets/Residential.svg";
import EyeOpen from "../assets/visibility.svg";
import EyeClosed from "../assets/visibility_off.svg";
import axios from "axios";
import Dashboard from "./dashboard/Dashboard";

const Login = (): ReactNode => {
  const [showPassword, setShowPassword] = useState(false);
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    setMessage("");

    if (!cedula || !password) {
      setMessage("⚠️ Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post<{ access_token: string; rol: number }>(
        "http://127.0.0.1:3000/auth/login",
        {
          username: cedula,
          password: password,
        }
      );

      if (response.status === 200 && response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("userCedula", cedula);
        localStorage.setItem("rol", response.data.rol.toString());

        setMessage("✅ Inicio de sesión exitoso.");
        setIsLoggedIn(true);
      } else {
        setMessage("❌ Credenciales incorrectas. Intenta de nuevo.");
      }
    } catch (error: any) {
      setMessage("❌ Error en el inicio de sesión. Verifica tus datos.");
    }
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src={Logo} alt="Residential Logo" className="logo-img" />
        </div>

        <div className="login-form">
          <h2>Iniciar Sesión</h2>

          {message && <p className="login-message">{message}</p>}

          <div className="input-group">
            <label htmlFor="cedula">Número de cédula</label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ingresa tu número de cédula"
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button className="login-btn" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
