import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import empresaReducer from "../features/empresa/empresaSlice";
import produectoReducer from "../features/producto/productoSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    empresa: empresaReducer,
    producto: produectoReducer,
  },
});
