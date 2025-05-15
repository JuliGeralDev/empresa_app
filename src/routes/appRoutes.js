import EmpresasPage from "../pages/Empresas/EmpresasPage";
import EmpresasVisitante from "../pages/Empresas/EmpresasVisitante";
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
  {
    path: "/empresas/visitante",
    component: EmpresasVisitante,
    protected: true,
    role: "externo",
  },
];
