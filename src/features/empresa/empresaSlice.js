import { createSlice } from "@reduxjs/toolkit";
import dataInicial from "../../data/empresa/empresas.json";

const STORAGE_KEY = "empresas";

/**
 * Carga la lista de empresas desde localStorage si existe.
 * Si no hay datos guardados, inicializa localStorage con datos por defecto.
 *
 * @returns {Array} Lista de empresas
 */
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
    editarEmpresa: (state, action) => {
      const empresaEditada = action.payload;
      const index = state.lista.findIndex(emp => emp.nit === empresaEditada.nit);
      if (index !== -1) {
        state.lista[index] = empresaEditada;
        localStorage.setItem("empresas", JSON.stringify(state.lista));
      }
    },
    eliminarEmpresa: (state, action) => {
      const id = action.payload;
      state.lista = state.lista.filter((empresa) => empresa.nit !== id);
      localStorage.setItem("empresas", JSON.stringify(state.lista));
    },
  },
});

export const { agregarEmpresa, editarEmpresa, eliminarEmpresa } = empresaSlice.actions;
export default empresaSlice.reducer;
