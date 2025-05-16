import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Box, Modal } from "@mui/material";

import Title from "../../components/atoms/Title";
import TablaEntidad from "../../components/templates/TablaEntidad";
import BotonAgregar from "../../components/atoms/BotonAgregar";
import EmpresaForm from "../../components/molecules/EmpresaForm";
import DialogConfirmacion from "../../components/molecules/DialogConfirmacion";

import { eliminarEmpresa } from "../../features/empresa/empresaSlice";

const Empresas = () => {
  const empresas = useSelector((state) => state.empresa.lista);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [empresaEditando, setEmpresaEditando] = useState(null);
  const [open, setOpen] = useState(false);

  const [empresaEliminar, setEmpresaEliminar] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenModal = (empresa = null) => {
    setEmpresaEditando(empresa);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEmpresaEditando(null);
  };

  const handleEliminar = (empresa) => {
    setEmpresaEliminar(empresa);
    setDialogOpen(true);
  };

  const confirmarEliminacion = () => {
      
      if (empresaEliminar) {
        dispatch(eliminarEmpresa(empresaEliminar.nit));
        console.log("Eliminando empresa:", empresaEliminar);
        setEmpresaEliminar(null);
    }
    setDialogOpen(false);
  };

  const columnas = [
    { label: "NIT", key: "nit" },
    { label: "Nombre", key: "nombre" },
    { label: "Dirección", key: "direccion" },
    { label: "Teléfono", key: "telefono" },
    { label: "Ciudad", key: "ciudad" },
    { label: "Sector", key: "sector" }
  ];

  const filas = empresas.map((empresa) => ({
    ...empresa,
  }));

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
      <Title text="Listado de Empresas" />

      {user?.role === "admin" && (
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
          <BotonAgregar text="Agregar Empresa" onClick={() => handleOpenModal(null)} />
        </Box>
      )}

      <TablaEntidad
        columnas={columnas}
        filas={filas}
        onEditar={handleOpenModal}
        onEliminar={handleEliminar}
      />

      <DialogConfirmacion
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmarEliminacion}
        title="Eliminar empresa"
        message="¿Estás seguro de que deseas eliminar la empresa"
        itemName={empresaEliminar?.nombre}
      />

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
          <EmpresaForm
            key={empresaEditando?.nit || "nueva"}
            onClose={handleCloseModal}
            initialData={empresaEditando}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default Empresas;
