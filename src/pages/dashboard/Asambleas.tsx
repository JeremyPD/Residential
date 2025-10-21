import React, { useState, type MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { MoreVertical } from "lucide-react";
import CreateAsambleaModal from "../../components/CreateAsambleaModal";

interface Asamblea {
  id: number;
  nombre: string;
  image: string;
}

const Asambleas: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAsamblea, setSelectedAsamblea] = useState<Asamblea | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const asambleas: Asamblea[] = [
    { id: 1, nombre: "ASAMBLEA GENERAL", image: "/src/assets/asambleas/asamblea1.jpg" },
    { id: 2, nombre: "ASAMBLEA EXTRAORDINARIA", image: "/src/assets/asambleas/asamblea2.jpg" },
    { id: 3, nombre: "ASAMBLEA ADMINISTRATIVA", image: "/src/assets/asambleas/asamblea3.jpg" },
    { id: 4, nombre: "ASAMBLEA DE EMERGENCIA", image: "/src/assets/asambleas/asamblea4.jpg" },
  ];

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, asamblea: Asamblea) => {
    setAnchorEl(event.currentTarget);
    setSelectedAsamblea(asamblea);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const showMessage = (msg: string) => {
    setSnackbarMessage(msg);
    setOpenSnackbar(true);
    setTimeout(() => setOpenSnackbar(false), 3000);
  };

  const handleIniciar = () => {
    handleMenuClose();
    showMessage(`Se inició la asamblea "${selectedAsamblea?.nombre}"`);
  };

  const handleEliminar = () => {
    handleMenuClose();
    setConfirmDialogOpen(true);
  };

  const confirmEliminar = () => {
    setConfirmDialogOpen(false);
    showMessage(`Se eliminó la asamblea "${selectedAsamblea?.nombre}"`);
  };

  const cancelEliminar = () => setConfirmDialogOpen(false);

  return (
    <div className="asambleas-view">
      <CreateAsambleaModal />

      <div className="cards-container">
        {asambleas.map((a) => (
          <div key={a.id} className="asamblea-card" style={{ backgroundImage: `url(${a.image})` }}>
            <div className="asamblea-overlay" />
            <IconButton className="menu-btn" onClick={(e) => handleMenuOpen(e, a)}>
              <MoreVertical color="#fff" />
            </IconButton>
            <p className="asamblea-nombre">{a.nombre}</p>
          </div>
        ))}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            padding: "0",
            width: 160,
          },
        }}
      >
        <MenuItem onClick={handleIniciar}>Iniciar</MenuItem>
        <hr style={{ margin: "0 10px", width: "80%", border: "0.5px solid #ccc" }} />
        <MenuItem onClick={handleEliminar}>
          Eliminar
        </MenuItem>
      </Menu>

      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          sx: {
            backgroundColor: "rgba(255,255,255,0.95)",
            color: "#1976D2",
            fontWeight: "bold",
            border: "1.5px solid #1976D2",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
          },
        }}
      />

      <Dialog open={confirmDialogOpen} onClose={cancelEliminar}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Seguro que deseas eliminar la asamblea "{selectedAsamblea?.nombre}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelEliminar}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={confirmEliminar}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Asambleas;
