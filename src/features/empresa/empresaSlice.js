import { createSlice } from "@reduxjs/toolkit";
import dataInicial from "../../data/empresa/empresas.json";

const STORAGE_KEY = "empresas";

// Obtener empresas del localStorage o del JSON inicial
const cargarEmpresas = () => {
  const guardadas = localStorage.getItem(STORAGE_KEY);
  if (guardadas) return JSON.parse(guardadas);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataInicial));
  return dataInicial;
};

const initialState = {
  lista: cargarEmpresas(),
};

const empresaSlice = createSlice({
  name: "empresa",
  initialState,
  reducers: {
    agregarEmpresa: (state, action) => {
      const nuevaEmpresa = action.payload;
      state.lista.push(nuevaEmpresa);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lista));
    },
  },
});

export const { agregarEmpresa } = empresaSlice.actions;
export default empresaSlice.reducer;
