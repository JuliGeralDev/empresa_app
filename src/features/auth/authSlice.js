import { createSlice } from "@reduxjs/toolkit";

/**
 * Obtiene el usuario guardado desde localStorage (si existe).
 * Se usa para inicializar el estado de autenticación al cargar la app.
 *
 * @returns {Object|null} Usuario autenticado o null si no hay sesión guardada.
 */
const getInitialUser = () => {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Error al leer localStorage:", error);
    return null;
  }
};

const initialState = {
  user: getInitialUser(), // Inicializa el estado con el usuario guardado en localStorage
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Guarda sesión
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Limpia sesión
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
