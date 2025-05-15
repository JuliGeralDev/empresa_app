import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BotonEliminar = ({ onClick }) => {
  return (
    <IconButton
      color="error"
      onClick={onClick}
      aria-label="Eliminar"
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default BotonEliminar;
