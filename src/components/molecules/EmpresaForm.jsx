import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import BotonGuardar from "../atoms/BotonGuardar";
import { useDispatch } from "react-redux";
import { agregarEmpresa, editarEmpresa } from "../../features/empresa/empresaSlice";
import { useEffect } from "react";
const EmpresaForm = ({ onClose, initialData = null }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [initialData, setValue]);

  const onSubmit = (data) => {
    const empresa = {
      ...data,
      id: initialData ? initialData.id : crypto.randomUUID(),
    };

    if (initialData) {
      dispatch(editarEmpresa(empresa));
    } else {
      dispatch(agregarEmpresa(empresa));
    }

    reset();
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="NIT" fullWidth {...register("nit")} required />
      <TextField label="Nombre" fullWidth {...register("nombre")} required />
      <TextField label="Dirección" fullWidth {...register("direccion")} required />
      <TextField label="Ciudad" fullWidth {...register("ciudad")} required />
      <TextField label="Sector" fullWidth {...register("sector")} required />
      <BotonGuardar />
    </Box>
  );
};

export default EmpresaForm;
