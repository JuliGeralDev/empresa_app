import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import BotonGuardar from "../atoms/BotonGuardar";
import { useDispatch } from "react-redux";
import { agregarEmpresa } from "../../features/empresa/empresaSlice";

const EmpresaForm = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const nuevaEmpresa = {
      ...data,
      id: crypto.randomUUID(), // ID único si no tienes backend
    };

    dispatch(agregarEmpresa(nuevaEmpresa));
    
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
      <TextField label="Ciudad" fullWidth {...register("ciudad")} required />
      <TextField label="Sector" fullWidth {...register("sector")} required />
      <BotonGuardar />
    </Box>
  );
};

export default EmpresaForm;
