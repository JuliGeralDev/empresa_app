import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Box, Modal } from "@mui/material";
import Title from "../../components/atoms/Title";
import BotonAgregar from "../../components/atoms/BotonAgregar";
import ProductoForm from "../../components/molecules/ProductoForm";
import DialogConfirmacion from "../../components/molecules/DialogConfirmacion";
import TablaEntidad from "../../components/templates/TablaEntidad";
import { eliminarProducto } from "../../features/producto/productoSlice";

const ProductosPage = () => {
  const productos = useSelector((state) => state.producto.lista);
  const user = useSelector((state) => state.auth.user);
  const esAdmin = user?.role === "admin";

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

  const titulos = ["Código", "Nombre", "Características", "Precios", "Empresa"];
  const filas = productos.map((prod) => ({
    id: prod.id,
    Código: prod.codigo,
    Nombre: prod.nombre,
    Características: prod.caracteristicas,
    Precios: `COP: $${prod.precios.COP} | USD: $${prod.precios.USD} | EUR: €${prod.precios.EUR}`,
    Empresa: prod.empresa,
  }));

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>
      <Title text="Listado de Productos" />

      {esAdmin && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <BotonAgregar text="Agregar Producto" onClick={handleOpenModal} />
        </Box>
      )}

      <TablaEntidad
        titulos={titulos}
        filas={filas}
        onEditar={handleOpenModal}
        onEliminar={handleEliminar}
      />

      <DialogConfirmacion
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={confirmarEliminacion}
        id={productoEliminar?.id}
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
          <ProductoForm onClose={handleCloseModal} initialData={productoEditando} />
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductosPage;
