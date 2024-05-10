import React, { Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, muestra el contenido de la ruta privada
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default PrivateRoute;
