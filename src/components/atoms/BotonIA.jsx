import { Button, CircularProgress } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const BotonIA = ({ onClick, loading }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<SmartToyIcon />}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? <CircularProgress size={20} /> : "Generar con IA"}
    </Button>
  );
};

export default BotonIA;
