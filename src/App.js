import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthProvider } from "./service/AuthContext";
import ProtectedRoute from "./service/ProtectedRoute";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import Request from "./pages/request/Request";

// Crear un componente wrapper para el AuthProvider
const AuthWrapper = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthWrapper>
          <Home />
        </AuthWrapper>
      ),
    },
    {
      path: "/iniciar-sesion",
      element: (
        <AuthWrapper>
          <Login />
        </AuthWrapper>
      ),
    },
    {
      path: "/administracion",
      element: (
        <AuthWrapper>
          <ProtectedRoute requiredRole={true}>
            <Dashboard />
          </ProtectedRoute>
        </AuthWrapper>
      ),
    },
    {
      path: "/mi-cuenta",
      element: (
        <AuthWrapper>
          <ProtectedRoute requiredRole={false}>
            <UserDashboard />
          </ProtectedRoute>
        </AuthWrapper>
      ),
    },
    {
      path: "/turnos",
      element: (
        <AuthWrapper>
          <Request />
        </AuthWrapper>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
