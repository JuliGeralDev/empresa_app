import { useForm } from "react-hook-form";
import { users } from "../../data/login/users";
import { comparePasswords } from "../../utils/encrypt";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Redirige automáticamente si ya hay usuario logueado
  useEffect(() => {
    if (user) {
      navigate("/empresas");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const user = users.find((u) => u.email === data.email);
    if (user && (await comparePasswords(data.password, user.password))) {
      dispatch(login({ email: user.email, role: user.role }));
      navigate("/empresas");
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Correo"
            type="email"
            {...register("email")}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            type="password"
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
