import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BotonGuardar from "../atoms/BotonGuardar";
import BotonIA from "../atoms/BotonIA";
import {
  agregarProducto,
  editarProducto,
} from "../../features/producto/productoSlice";
import { generarDescripcion } from "../../services/openaiService";

const ProductoForm = ({ onClose, initialData = null }) => {
  const empresas = useSelector((state) => state.empresa.lista);
  const dispatch = useDispatch();
  const [cargandoIA, setCargandoIA] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, control } = useForm();

  const nombreProducto = watch("nombre");

  useEffect(() => {
    if (initialData) {
      const data = {
        ...initialData,
        cop: initialData.precios?.COP,
        usd: initialData.precios?.USD,
        eur: initialData.precios?.EUR,
        empresa: initialData.empresa,
      };
      reset(data);
    }
  }, [initialData, reset]);

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

  const handleGenerarDescripcion = async () => {
    if (!nombreProducto) return;
    setCargandoIA(true);
    const descripcion = await generarDescripcion(nombreProducto);
    setValue("caracteristicas", descripcion);
    setCargandoIA(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField label="Código" {...register("codigo")} required fullWidth />
      <TextField label="Nombre" {...register("nombre")} required fullWidth />

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          label="Características"
          {...register("caracteristicas")}
          required
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <BotonIA onClick={handleGenerarDescripcion} loading={cargandoIA} />
      </Box>

      <TextField
        label="Precio COP"
        {...register("cop")}
        type="number"
        required
        fullWidth
      />
      <TextField
        label="Precio USD"
        {...register("usd")}
        type="number"
        required
        fullWidth
      />
      <TextField
        label="Precio EUR"
        {...register("eur")}
        type="number"
        required
        fullWidth
      />

      <FormControl fullWidth required>
        <InputLabel>Empresa</InputLabel>
        <Controller
          name="empresa"
          control={control}
          render={({ field }) => (
            <Select
              label="Empresa"
              {...field}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
            >
              {empresas.map((e) => (
                <MenuItem key={e.nit} value={e.nit}>
                  {e.nombre}
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
