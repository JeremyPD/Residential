import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { es } from "date-fns/locale";
import { Plus } from "lucide-react";
import "./CreateAsambleaModal.css";

const CreateAsambleaModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState<Date | null>(new Date());
  const [hora, setHora] = useState<Date | null>(new Date());

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setNombre("");
    setFecha(new Date());
    setHora(new Date());
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log({
      nombreAsamblea: nombre,
      fecha: fecha ? fecha.toLocaleDateString() : "No seleccionada",
      hora: hora ? hora.toLocaleTimeString() : "No seleccionada",
    });
    handleClose();
  };

  return (
    <Box>
      <button className="create-btn" onClick={handleOpen}>
        <Plus size={22} />
        Crear
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inicia la asamblea</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nombre de la asamblea"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                label="Seleccionar fecha"
                value={fecha}
                onChange={(newDate) => setFecha(newDate ?? new Date())}
              />
              <TimePicker
                label="Seleccionar hora"
                value={hora}
                onChange={(newTime) => setHora(newTime ?? new Date())}
                ampm
              />
            </LocalizationProvider>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ borderRadius: 2 }}
            >
              Iniciar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateAsambleaModal;
