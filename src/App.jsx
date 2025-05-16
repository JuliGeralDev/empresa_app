import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import Menu from "./components/organisms/Menu";
import "./App.css";
function App() {
  return (
    
      <Router>
        <Menu />
        <Routes>
          {appRoutes.map(({ path, component: Component, protected: isProtected, role }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute  roles={role}>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                )
              }
            />
          ))}
        </Routes>
      </Router>
    
  );
}

export default App;
