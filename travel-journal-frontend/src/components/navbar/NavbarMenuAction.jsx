import { useContext } from "react";
import { NavbarContext } from "../../contexts/navbar-context.jsx";
// Componente del menú de la barra de navegación
export function NavbarMenuAction({ action, children }) {
    // Obtenemos la función closeMenu del contexto NavbarContext
    const { closeMenu } = useContext(NavbarContext);
    return (
        <li>
            {/* Botón que ejecuta la acción y cierra el menú */}
            <button
                onClick={() => {
                    action();
                    closeMenu();
                }}
            >
                {children}
            </button>
        </li>
    );
}
