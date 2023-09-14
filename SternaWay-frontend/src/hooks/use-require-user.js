import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "./use-current-user.js";
// Función que redirige al usuario a la página de inicio de sesión si no hay un usuario actual
export function useRequireUser(path = "/login") {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  useEffect(() => {
    if (!currentUser) {
      navigate(path);
    }
  }, [currentUser, navigate, path]);
}
