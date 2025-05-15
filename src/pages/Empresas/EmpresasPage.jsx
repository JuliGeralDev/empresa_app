import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const EmpresasPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <h1>Vista de Empresas (Administrador)</h1>
      <Button variant="outlined" onClick={handleLogout}>Cerrar sesión</Button>
    </>
  );
};

export default EmpresasPage;