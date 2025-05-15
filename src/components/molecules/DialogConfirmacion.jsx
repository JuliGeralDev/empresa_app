import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DialogConfirmacion = ({
  open,
  onClose,
  onConfirm,
  title = "¿Estás segura?",
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