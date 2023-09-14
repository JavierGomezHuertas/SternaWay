import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "./use-current-user.js";
import { useEffect } from "react";
// Función que redirige a la página especificada si el usuario no es anónimo
export function useRequireAnon(path = "/") {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  useEffect(() => {
    if (currentUser) {
      navigate(path);
    }
  }, [currentUser, navigate, path]);
}
