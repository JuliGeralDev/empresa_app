import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

/**
 * Modal de confirmación reutilizable para acciones como eliminar.
 *
 * @param {boolean} open - Controla si el diálogo está abierto.
 * @param {Function} onClose - Función para cerrar el modal.
 * @param {Function} onConfirm - Función que se ejecuta al confirmar, recibe el `id`.
 * @param {string} title - Título del diálogo (opcional).
 * @param {string} message - Mensaje del cuerpo (opcional).
 * @param {string} itemName - Nombre del elemento afectado (opcional).
 * @param {string|number} id - ID del elemento a confirmar.
 */
const DialogConfirmacion = ({
  open,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  itemName = "",
  id,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>
          {message}
          {itemName && <strong> {itemName}</strong>}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={() => onConfirm(id)} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmacion;