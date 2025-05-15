import EmpresasPage from "../pages/Empresas/EmpresasPage";
import LoginPage from "../pages/Login/LoginPage";
import ProductosPage from "../pages/Productos/ProductosPage";

export const appRoutes = [
  {
    path: "/",
    component: LoginPage,
    protected: false,
  },
  {
    path: "/empresas",
    component: EmpresasPage,
    protected: true,
    role: ["admin", "externo"],
  },
  {
    path: "/productos",
    component: ProductosPage,
    protected: true,
    role: ["admin"],
  },
];


