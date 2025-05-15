import { useEffect, useState } from "react";
import empresasData from "../../data/empresa/empresas.json";
import Title from "../../components/atoms/Title";
import EmpresasTable from "../../components/organisms/EmpresasTable";
import BotonAgregar from "../../components/atoms/BotonAgregar";
import { Container, Box } from "@mui/material";

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    setEmpresas(empresasData);
  }, []);

  const handleOpenModal = () => {
    console.log("Abrir modal");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
        <Title text="Listado de Empresas" />

        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mt: 4,
                mb: 1,
                gap: 1,
            }}
            >
            
            <BotonAgregar text='Agregar Empresa' onClick={handleOpenModal} />
        </Box>

        <EmpresasTable empresas={empresas} />
    </Container>
  );
};

export default Empresas;