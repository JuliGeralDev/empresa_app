import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import TablaEntidad from "../../components/templates/TablaEntidad";
import Title from "../../components/atoms/Title";
import { enviarInventarioPorCorreo } from "../../services/inventarioService";

const InventarioPage = () => {
  const productos = useSelector((state) => state.producto.lista);
  const empresas = useSelector((state) => state.empresa.lista);

  const [empresaSeleccionada, setEmpresaSeleccionada] = useState("");
  const [enviando, setEnviando] = useState(false);

  const productosFiltrados = empresaSeleccionada
    ? productos.filter((p) => p.empresa === empresaSeleccionada)
    : productos;

  const columnas = [
    { label: "Código", key: "codigo" },
    { label: "Nombre", key: "nombre" },
    { label: "Características", key: "caracteristicas" },
    { label: "Precios", key: "preciosFormateados" },
    { label: "Empresa", key: "empresaNombre" },
  ];

  const filas = productosFiltrados.map((producto) => {
    const empresa = empresas.find((e) => e.nit === producto.empresa);
    return {
      ...producto,
      preciosFormateados: `COP: $${producto.precios.COP}, USD: $${producto.precios.USD}, EUR: €${producto.precios.EUR}`,
      empresaNombre: empresa?.nombre || producto.empresa,
    };
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Inventario de Productos", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [columnas.map((col) => col.label)],
      body: filas.map((fila) => columnas.map((col) => fila[col.key])),
    });
    doc.save("inventario.pdf");
  };

  const handleSendByEmail = async () => {
    setEnviando(true);
    const success = await enviarInventarioPorCorreo(filas);
    setEnviando(false);
    alert(success ? "Inventario enviado por correo (simulado)" : "Error al enviar el inventario");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
      <Title text="Inventario de Productos por Empresa" />

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Empresa</InputLabel>
          <Select
            value={empresaSeleccionada}
            onChange={(e) => setEmpresaSeleccionada(e.target.value)}
            label="Empresa"
          >
            <MenuItem value="">Todas</MenuItem>
            {empresas.map((e) => (
              <MenuItem key={e.nit} value={e.nit}>
                {e.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" color="primary" onClick={handleDownloadPDF}>
          Descargar PDF
        </Button>
        
        <Button
          variant="contained"
          color="success"
          onClick={handleSendByEmail}
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar por correo"}
        </Button>
      </Box>

      <TablaEntidad columnas={columnas} filas={filas} />
    </Container>
  );
};

export default InventarioPage;
