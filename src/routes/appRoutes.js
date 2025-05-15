import EmpresasPage from "../pages/Empresas/EmpresasPage";
import LoginPage from "../pages/Login/LoginPage";

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
    role: "admin",
  },
];
