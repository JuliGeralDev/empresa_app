import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import BotonGuardar from "../atoms/BotonGuardar";
import { useDispatch } from "react-redux";
import { agregarEmpresa } from "../../features/empresa/empresaSlice";
import { useEffect } from "react";
import { editarEmpresa } from "../../features/empresa/empresaSlice";

const EmpresaForm = ({ onClose, initialData = null }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const empresa = { ...data };

    if (initialData) {
      console.log("Editando empresa:", initialData);
      dispatch(editarEmpresa(empresa));
    } else {
      console.log("Agregando empresa:", empresa);
      dispatch(agregarEmpresa(empresa));
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
