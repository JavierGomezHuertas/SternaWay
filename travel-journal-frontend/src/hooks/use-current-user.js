import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context.jsx";
// Esta función devuelve el usuario actual
export function useCurrentUser() {
  const { currentUser } = useContext(AuthContext);
  return currentUser;
}
