import { createContext, useEffect, useState } from "react";
import { getUser } from "../utils/get-user.js";
import { getToken } from "../utils/get-token.js";
import { deleteToken } from "../utils/delete-token.js";
import { saveToken } from "../utils/save-token.js";
// Contexto de autenticación
export const AuthContext = createContext({
    currentUser: null,
    token: null,
});
// Contexto de cierre de sesión
export const LogoutContext = createContext(null);
// Contexto de inicio de sesión
export const LoginContext = createContext(null);
// Proveedor de autenticación
export function AuthProvider({ children }) {
    // Estado inicial del contexto de autenticación
    const [currentContext, setCurrentContext] = useState({
        currentUser: null,
        token: null,
    });
    // Función para cerrar sesión
    function logout() {
        // Eliminar el token del localStorage
        deleteToken();
        // Vaciar el contexto de autenticación
        setCurrentContext({ currentUser: null, token: null });
    }
    // Función para iniciar sesión
    function login(token) {
        // Guardar el token en el localStorage
        saveToken(token);
        // Obtener el usuario actual
        const user = getUser();
        // Actualizar el contexto de autenticación
        setCurrentContext({
            token,
            currentUser: user,
        });
    }
    // Verificar si hay un token almacenado al cargar el componente
    useEffect(() => {
        const token = getToken();
        if (token) {
            // Obtener el usuario actual
            const user = getUser();
            // Actualizar el contexto de autenticación
            setCurrentContext({
                token,
                currentUser: user,
            });
        }
    }, []);
    // Renderizar los proveedores de contexto y los componentes hijos
    return (
        <AuthContext.Provider value={currentContext}>
            <LogoutContext.Provider value={logout}>
                <LoginContext.Provider value={login}>
                    {children}
                </LoginContext.Provider>
            </LogoutContext.Provider>
        </AuthContext.Provider>
    );
}
