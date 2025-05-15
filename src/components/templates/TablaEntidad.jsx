import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import BotonEditar from "../atoms/BotonEditar";
import BotonEliminar from "../atoms/BotonEliminar";
import { useSelector } from "react-redux";

const TablaEntidad = ({ titulos, filas, onEditar, onEliminar }) => {
  const user = useSelector((state) => state.auth.user);
  const esAdmin = user?.role === "admin";

  if (!filas || filas.length === 0) {
    return <Typography>No hay registros disponibles.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table >
        <TableHead>
          <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
            {titulos.map((titulo) => (
              <TableCell
                key={titulo}
                sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase" }}
              >
                {titulo}
              </TableCell>
            ))}
            {esAdmin && (
              <TableCell sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase" }}>
                Acciones
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {filas.map((fila, index) => (
            <TableRow key={index}>
              {titulos.map((titulo) => (
                <TableCell key={titulo}>{fila[titulo]}</TableCell>
              ))}
              {esAdmin && (
                <TableCell>
                  <BotonEditar onClick={() => onEditar(fila)} />
                  <BotonEliminar onClick={() => onEliminar(fila)} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaEntidad;
