import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const BotonGuardar = ({ onClick }) => {
  return (
    <Button
      type="submit"
      startIcon={<SaveIcon />}
      variant="contained"
      color="primary"
      sx={{ alignSelf: "flex-end" }}
      onClick={onClick}
    >
      Guardar
    </Button>
  );
};

export default BotonGuardar;
