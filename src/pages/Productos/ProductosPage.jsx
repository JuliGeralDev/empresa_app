import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Box, Modal } from "@mui/material";

import Title from "../../components/atoms/Title";
import TablaEntidad from "../../components/templates/TablaEntidad";
import BotonAgregar from "../../components/atoms/BotonAgregar";
import ProductoForm from "../../components/molecules/ProductoForm";
import DialogConfirmacion from "../../components/molecules/DialogConfirmacion";

import { eliminarProducto } from "../../features/producto/productoSlice";

const ProductosPage = () => {
  const productos = useSelector((state) => state.producto.lista);
  const empresas = useSelector((state) => state.empresa.lista);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [productoEditando, setProductoEditando] = useState(null);
  const [open, setOpen] = useState(false);

  const [productoEliminar, setProductoEliminar] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenModal = (producto = null) => {
    setProductoEditando(producto);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setProductoEditando(null);
  };

  const handleEliminar = (producto) => {
    setProductoEliminar(producto);
    setDialogOpen(true);
  };

  const confirmarEliminacion = (id) => {
    dispatch(eliminarProducto(id));
    setDialogOpen(false);
    setProductoEliminar(null);
  };

  const columnas = [
    { label: "Código", key: "codigo" },
    { label: "Nombre", key: "nombre" },
    { label: "Características", key: "caracteristicas" },
    { label: "Precios", key: "preciosFormateados" },
    { label: "Empresa", key: "empresaNombre" }
  ];

  const filas = productos.map((producto) => {
    const empresa = empresas.find((e) => e.nit === producto.empresa);
    return {
      ...producto,
      preciosFormateados: `COP: $${producto.precios.COP}, USD: $${producto.precios.USD}, EUR: €${producto.precios.EUR}`,
      empresaNombre: empresa?.nombre || producto.empresa,
    };
  });

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
      <Title text="Listado de Productos" />

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
          <BotonAgregar text="Agregar Producto" onClick={handleOpenModal} />
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
        id={productoEliminar?.nit}
        title="Eliminar producto"
        message="¿Estás segura de que deseas eliminar el producto"
        itemName={productoEliminar?.nombre}
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
          <ProductoForm
            key={productoEditando?.id || "nuevo"}
            onClose={handleCloseModal}
            initialData={productoEditando}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductosPage;
