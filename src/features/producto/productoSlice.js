import { createSlice } from "@reduxjs/toolkit";
import productosIniciales from "../../data/producto/productos.json";

const STORAGE_KEY = "productos";

const cargarProductos = () => {
  const guardados = localStorage.getItem(STORAGE_KEY);
  if (guardados) return JSON.parse(guardados);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(productosIniciales));
  return productosIniciales;
};

const initialState = {
  lista: cargarProductos(),
};

const productoSlice = createSlice({
  name: "producto",
  initialState,
  reducers: {
    agregarProducto: (state, action) => {
      state.lista.push(action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lista));
    },
    editarProducto: (state, action) => {
      const actualizado = action.payload;
      const index = state.lista.findIndex(p => p.codigo === actualizado.codigo);
      if (index !== -1) {
        state.lista[index] = actualizado;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lista));
      }
    },
    eliminarProducto: (state, action) => {
      const codigo = action.payload;
      state.lista = state.lista.filter(p => p.codigo !== codigo);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lista));
    },
  },
});

export const {
  agregarProducto,
  editarProducto,
  eliminarProducto
} = productoSlice.actions;

export default productoSlice.reducer;
