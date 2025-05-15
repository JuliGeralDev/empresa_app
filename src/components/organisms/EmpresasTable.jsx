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

const titulos = ["NIT", "Nombre", "Dirección", "Ciudad", "Sector"];

const EmpresasTable = ({ empresas, onEditar }) => {

  if (empresas.length === 0) {
    return <Typography>No hay empresas registradas.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
            {titulos.map((titulo) => (
              <TableCell key={titulo} sx={{ color: "white", fontWeight: "bold" , textTransform: "uppercase"}}>
                {titulo}
              </TableCell>
            ))}
            <TableCell sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase" }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {empresas.map((empresa) => {

            const rowData = {
              "NIT": empresa.nit,
              "Nombre": empresa.nombre,
              "Dirección": empresa.direccion,
              "Ciudad": empresa.ciudad,
              "Sector": empresa.sector,
            };

            return (
              <TableRow key={empresa.id}>
                {titulos.map((titulo) => (
                  <TableCell key={titulo}>{rowData[titulo]}</TableCell>
                ))}
                <TableCell>
                  <BotonEditar onClick={() => onEditar(empresa)} />
                  <BotonEliminar onClick={() => {}} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmpresasTable;
