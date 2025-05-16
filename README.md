# 🚀 Empresa App

Aplicación de gestión de empresas, productos e inventario desarrollada con **React 19**, **Redux Toolkit**, **Material UI** y **Vite**. Este proyecto aplica principios de diseño atómico para crear componentes reutilizables, utiliza `localStorage` para persistencia y se apoya en **inteligencia artificial (Cohere)** para generar descripciones automáticas de productos.


## 🧱 Estructura del Proyecto

```
src/
├── assets/         → Imágenes y recursos gráficos
├── components/     → Atoms, Molecules, Organisms, Templates (Atomic Design)
├── data/           → Archivos JSON simulados
├── features/       → Redux slices por entidad
├── hooks/          → Custom hooks reutilizables
├── pages/          → Vistas principales
├── routes/         → Configuración de rutas protegidas
├── services/       → Integraciones externas (cohereService.js)
├── store/          → Configuración de Redux Toolkit
├── utils/          → Funciones auxiliares
├── App.jsx         → Componente raíz
└── main.jsx        → Punto de entrada principal
```



## ⚙️ Scripts

| Comando            | Descripción                                         |
|-------------------|-----------------------------------------------------|
| `npm run dev`      | Inicia el servidor de desarrollo con Vite          |
| `npm run build`    | Genera la versión optimizada para producción       |
| `npm run preview`  | Previsualiza la build de producción                |
| `npm run lint`     | Ejecuta ESLint para revisión de código             |



## 🛠️ Tecnologías Utilizadas

- ⚛️ React 19
- 🔁 Redux Toolkit
- 🌐 React Router DOM
- 🎨 Material UI
- 📋 React Hook Form + Yup
- ⚡ Vite
- 🤖 Cohere API (IA para generación automática de contenido)



## ✨ Funcionalidades Destacadas

✅ Gestión de empresas, productos y usuarios  
✅ Componentes construidos bajo Atomic Design  
✅ Almacenamiento y persistencia de estado con `localStorage`  
✅ Formularios con validación controlada y estructura flexible  
✅ Generación automática de características técnicas mediante IA (Cohere)  
✅ Componentes reutilizables para botones, tablas y modales de confirmación  



## ⚡ Instalación Rápida

```bash
git clone https://github.com/tu-usuario/empresa-app.git
cd empresa-app
npm install
npm run dev
```


## 🧠 Notas Técnicas

- Los datos están simulados localmente en archivos `.json` dentro de la carpeta `/data/`.
- Todo cambio en la aplicación (crear, editar o eliminar) se sincroniza con el estado global de Redux y se guarda en `localStorage`.
- Las descripciones generadas por Cohere se adaptan automáticamente según el nombre del producto, utilizando prompts optimizados para entregar un resultado realista.
- La tabla principal y los formularios fueron diseñados para ser adaptables y reutilizables para otras entidades como productos o inventario.


## 👩‍💻 Author

**Juliana García Corredor**  
GitHub: [@JuliGeralDev](https://github.com/JuliGeralDev)
