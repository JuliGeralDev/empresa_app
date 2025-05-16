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

/**
 * Componente genérico de tabla reutilizable para mostrar entidades como empresas, productos o inventario.
 * 
 * Muestra los datos en una tabla configurable con columnas dinámicas.
 * Incluye botones de edición y eliminación solo si el usuario autenticado tiene rol de "admin".
 *
 * @component
 * @param {Array<Object>} columnas - Arreglo de objetos que definen las columnas. Cada objeto debe tener `key` y `label`.
 * @param {Array<Object>} filas - Arreglo de objetos que representan los datos a renderizar.
 * @param {Function} onEditar - Función callback al hacer clic en el botón de editar. Recibe como argumento la fila seleccionada.
 * @param {Function} onEliminar - Función callback al hacer clic en el botón de eliminar. Recibe como argumento la fila seleccionada.
 * 
 */
const TablaEntidad = ({ columnas, filas, onEditar, onEliminar }) => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "admin";
  
  if (!filas || filas.length === 0) {
    return <Typography>No hay registros disponibles.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
            {columnas.map((col) => (
              <TableCell
                key={col.key}
                sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase" }}
              >
                {col.label}
              </TableCell>
            ))}
            {isAdmin && (
              <TableCell
                sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase" }}
              >
                Acciones
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {filas.map((fila, index) => (
            <TableRow key={index}>
              {columnas.map((col) => (
                <TableCell key={col.key}>{fila[col.key]}</TableCell>
              ))}
              {isAdmin && (
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
