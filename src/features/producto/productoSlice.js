import { createSlice } from "@reduxjs/toolkit";
import productosIniciales from "../../data/producto/productos.json";

const STORAGE_KEY = "productos";

// Cargar desde localStorage o JSON inicial
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
      const productoActualizado = action.payload;
      const index = state.lista.findIndex(p => p.id === productoActualizado.id);
      if (index !== -1) {
        state.lista[index] = productoActualizado;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lista));
      }
    },

    eliminarProducto: (state, action) => {
      const id = action.payload;
      state.lista = state.lista.filter(p => p.id !== id);
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
