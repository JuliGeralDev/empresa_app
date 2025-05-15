import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const BotonEditar = ({ onClick }) => {
  return (
    <IconButton
      color="primary"
      onClick={onClick}
      aria-label="Editar"
    >
      <EditIcon />
    </IconButton>
  );
};

export default BotonEditar;