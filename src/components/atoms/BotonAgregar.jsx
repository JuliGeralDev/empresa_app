import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const BotonAgregar = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      startIcon={<AddIcon />}
      sx={{
        backgroundColor: "green",
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
        borderRadius: "20px",         // más redondeado
        px: 2,
        py: 1,
        "&:hover": {
          backgroundColor: "#0a3616",
        },
        cursor: "pointer",
      }}
    >
      {text}
    </Button>
  );
};

export default BotonAgregar;
