import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import BotonGuardar from "../atoms/BotonGuardar";
import { useDispatch } from "react-redux";
import { agregarEmpresa, editarEmpresa } from "../../features/empresa/empresaSlice";
import { useEffect } from "react";

const EmpresaForm = ({ onClose, initialData = null }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
  if (initialData) {
    reset(initialData);
  }
}, [initialData, reset]);


  const onSubmit = (data) => {
    const empresa = {
      ...data,
      id: initialData ? initialData.nit : crypto.randomUUID(),
    };

    if (initialData) {
      dispatch(editarEmpresa(empresa));
    } else {
      dispatch(agregarEmpresa(empresa));
    }

    reset();     // limpia el formulario después de guardar
    onClose();   
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="NIT" fullWidth {...register("nit")} required disabled/>
      <TextField label="Nombre" fullWidth {...register("nombre")} required />
      <TextField label="Dirección" fullWidth {...register("direccion")} required />
      <TextField label="Ciudad" fullWidth {...register("ciudad")} required />
      <TextField label="Sector" fullWidth {...register("sector")} required />
      <BotonGuardar />
    </Box>
  );
};

export default EmpresaForm;
