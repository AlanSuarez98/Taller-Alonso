// App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard"; // Ruta protegida
import { AuthProvider } from "./service/AuthContext";
import ProtectedRoute from "./service/ProtectedRoute";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import Request from "./pages/request/Request";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/iniciar-sesion",
      element: (
        <AuthProvider>
          <Login />
        </AuthProvider>
      ),
    },
    {
      path: "/administracion",
      element: (
        <AuthProvider>
          <ProtectedRoute requiredRole={true}>
            <Dashboard />
          </ProtectedRoute>
        </AuthProvider>
      ),
    },
    {
      path: "/mi-cuenta",
      element: (
        <AuthProvider>
          <ProtectedRoute requiredRole={false}>
            <UserDashboard />
          </ProtectedRoute>
        </AuthProvider>
      ),
    },
    {
      path: "/turnos",
      element: <Request />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
