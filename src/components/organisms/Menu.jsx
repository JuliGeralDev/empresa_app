import { useSelector, useDispatch } from "react-redux";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { appRoutes } from "../../routes/appRoutes";

const Menu = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null;

  const adminLinks = appRoutes.filter(
    (r) => r.protected && r.role?.includes("admin") && r.path !== "/"
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
        boxShadow: "none",
      }}
    >
      <Toolbar
        disableGutters // ✅ Quita padding horizontal
        sx={{
          width: "100%",
          px: 2, // padding horizontal opcional mínimo
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Enlaces del admin */}
        <Box sx={{ display: "flex", gap: 2, ml: 2 }}>
          {user.role === "admin" &&
            adminLinks.map(({ path, component }) => (
              <Button
                key={path}
                component={Link}
                to={path}
                sx={{
                  color: "white",
                  borderBottom: "2px solid transparent",
                  "&:hover": {
                    borderBottom: "2px solid white",
                  },
                }}
              >
                {component.name.replace("Page", "")}
              </Button>
            ))}
        </Box>

        {/* Botón de logout */}
        <Box sx={{ mr: 2 }}>
          <Button
            onClick={handleLogout}
            sx={{
              color: "white",
              borderBottom: "2px solid transparent",
              "&:hover": {
                borderBottom: "2px solid white",
              },
            }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
