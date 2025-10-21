import React, { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Typography,
  Box,
} from "@mui/material";
import "../../components/styles/Usuarios.css";

interface Usuario {
  id: string;
  username: string;
  password?: string;
}

const API_URL = "http://127.0.0.1:3000/users";

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const token = localStorage.getItem("token");

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) return showMessage("Token inválido o expirado");
        if (res.status === 403) return showMessage("Permisos insuficientes");
        throw new Error("Error al obtener usuarios");
      }

      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      showMessage("Error al cargar los usuarios");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreateUser = async () => {
    if (!username.trim() || !password.trim()) {
      showMessage("Usuario y contraseña son requeridos");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        if (res.status === 401) return showMessage("Token inválido o expirado");
        if (res.status === 403) return showMessage("Permisos insuficientes");
        throw new Error("Error al crear usuario");
      }

      showMessage("Usuario creado exitosamente");
      setOpenModal(false);
      setUsername("");
      setPassword("");
      fetchUsuarios();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      showMessage("Error al crear usuario");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(`${API_URL}/${selectedUser.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) return showMessage("Token inválido o expirado");
        if (res.status === 403) return showMessage("Permisos insuficientes");
        if (res.status === 404) return showMessage("Usuario no encontrado");
        throw new Error("Error al eliminar usuario");
      }

      showMessage("🗑️ Usuario eliminado correctamente");
      setOpenConfirm(false);
      setSelectedUser(null);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      showMessage("Error al eliminar usuario");
    }
  };

  const showMessage = (msg: string) => {
    setSnackbarMessage(msg);
    setOpenSnackbar(true);
    setTimeout(() => setOpenSnackbar(false), 3000);
  };

  return (
    <div className="usuarios-view">
      <div className="table-header">
        <h2>Gestión de Usuarios</h2>
        <div className="header-actions">
          <button className="upload-btn" onClick={() => setOpenModal(true)}>
            <Plus size={18} /> Añadir usuario
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="casas-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Contraseña</th>
              <th className="actions-column">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={3}>No hay usuarios registrados</td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>**********</td>
                  <td className="actions-column">
                    <button className="edit-btn" title="Editar usuario">
                      <Pencil size={20} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        setSelectedUser(u);
                        setOpenConfirm(true);
                      }}
                      title="Eliminar usuario"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Crear nuevo usuario</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Usuario"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleCreateUser} variant="contained">
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar al usuario{" "}
            <strong>{selectedUser?.username}</strong>? <br />
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={
          <Box
            sx={{
              textAlign: "center",
              width: "100%",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "8px 16px",
            }}
          >
            {snackbarMessage}
          </Box>
        }
        ContentProps={{
          sx: {
            backgroundColor: "rgba(240, 245, 255, 0.95)",
            color: "#0055ff",
            border: "1px solid #0055ff",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "300px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          },
        }}
      />
    </div>
  );
};

export default Usuarios;
