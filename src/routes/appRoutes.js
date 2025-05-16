  import EmpresasPage from "../pages/Empresas/EmpresasPage";
  import LoginPage from "../pages/Login/LoginPage";
  import ProductosPage from "../pages/Productos/ProductosPage";
  import InventarioPage from "../pages/Inventario/InventarioPage";

  export const appRoutes = [
    {
      path: "/",
      component: LoginPage,
      name: "Inicio de sesión",
      protected: false,
    },
    {
      path: "/empresas",
      component: EmpresasPage,
      name: "Empresas",
      protected: true,
      role: ["admin", "externo"],
    },
    {
      path: "/productos",
      component: ProductosPage,
      name: "Productos",
      protected: true,
      role: ["admin"],
    },
    {
      path: "/inventario",
      component: InventarioPage,
      name: "Inventario",
      protected: true,
      role: ["admin"],
    },
  ];

