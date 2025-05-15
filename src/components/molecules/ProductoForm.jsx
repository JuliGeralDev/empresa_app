import { Box, TextField, InputLabel, MenuItem, FormControl, Select, Chip, OutlinedInput } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import BotonGuardar from "../atoms/BotonGuardar";
import { useDispatch, useSelector } from "react-redux";
import { agregarProducto, editarProducto } from "../../features/producto/productoSlice";
import { useEffect } from "react";

const ProductoForm = ({ onClose, initialData = null }) => {
  const dispatch = useDispatch();
  const empresas = useSelector((state) => state.empresa.lista);

  const { register, handleSubmit, reset, control, setValue } = useForm();

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [initialData, setValue]);

  const onSubmit = (data) => {
    const producto = {
      ...data,
      id: initialData ? initialData.id : crypto.randomUUID(),
      precios: {
        COP: parseFloat(data.cop),
        USD: parseFloat(data.usd),
        EUR: parseFloat(data.eur),
      },
    };

    delete producto.cop;
    delete producto.usd;
    delete producto.eur;

    if (initialData) {
      dispatch(editarProducto(producto));
    } else {
      dispatch(agregarProducto(producto));
    }

    reset();
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Código" {...register("codigo")} required />
      <TextField label="Nombre" {...register("nombre")} required />
      <TextField label="Características" {...register("caracteristicas")} required />
      <TextField label="Precio COP" {...register("cop")} type="number" required />
      <TextField label="Precio USD" {...register("usd")} type="number" required />
      <TextField label="Precio EUR" {...register("eur")} type="number" required />

      <FormControl fullWidth>
        <InputLabel>Empresas</InputLabel>
        <Controller
          name="empresas"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Select
              multiple
              input={<OutlinedInput label="Empresas" />}
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => {
                    const empresa = empresas.find((e) => e.id === id);
                    return <Chip key={id} label={empresa?.nombre || id} />;
                  })}
                </Box>
              )}
            >
              {empresas.map((empresa) => (
                <MenuItem key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <BotonGuardar />
    </Box>
  );
};

export default ProductoForm;
