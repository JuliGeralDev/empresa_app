import { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Box, Modal } from "@mui/material";
import Title from "../../components/atoms/Title";
import EmpresasTable from "../../components/organisms/EmpresasTable";
import BotonAgregar from "../../components/atoms/BotonAgregar";
import EmpresaForm from "../../components/molecules/EmpresaForm";

const Empresas = () => {
    const empresas = useSelector((state) => state.empresa.lista);
    const [empresaEditando, setEmpresaEditando] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpenModal = (empresa = null) => {
        setEmpresaEditando(empresa);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setEmpresaEditando(null);
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
            <BotonAgregar text="Agregar Empresa" onClick={handleOpenModal} />
        </Box>

        <EmpresasTable empresas={empresas} onEditar={handleOpenModal} />

        <Modal open={open} onClose={handleCloseModal}>
            <Box
            sx={{
                width: 500,
                p: 4,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
            >
             <EmpresaForm onClose={handleCloseModal} initialData={empresaEditando} />  
            </Box>
        </Modal>
        </Container>
    );
};

export default Empresas;
