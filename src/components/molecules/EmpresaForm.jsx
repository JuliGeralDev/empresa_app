import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import BotonGuardar from "../atoms/BotonGuardar";
import useEmpresas from "../../hooks/useEmpresas";
import { useEffect } from "react";
/**
 * Formulario reutilizable para crear o editar una empresa.
 *
 * @param {Function} onClose - Cierra el formulario después de guardar.
 * @param {Object|null} initialData - Datos de empresa a editar (si existen).
 *
 * Usa react-hook-form para manejo de inputs.
 * Dispara acciones de Redux: agregarEmpresa o editarEmpresa.
 */
const EmpresaForm = ({ onClose, initialData = null }) => {
  const { register, handleSubmit, reset } = useForm();
  const { crear, actualizar } = useEmpresas();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const empresa = { ...data };

    if (initialData) {
      actualizar(empresa);
    } else {
      crear(empresa);
    }

    reset();
    onClose();
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField label="NIT" fullWidth {...register("nit")} required />
      <TextField label="Nombre" fullWidth {...register("nombre")} required />
      <TextField label="Dirección" fullWidth {...register("direccion")} required />
      <TextField label="Teléfono" fullWidth {...register("telefono")} required />
      <TextField label="Ciudad" fullWidth {...register("ciudad")} required />
      <TextField label="Sector" fullWidth {...register("sector")} required />
      <BotonGuardar />
    </Box>
  );
};

export default EmpresaForm;
