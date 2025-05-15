import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {appRoutes.map(({ path, component: Component, protected: isProtected, role }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute  roles={["admin", "externo"]}>
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
