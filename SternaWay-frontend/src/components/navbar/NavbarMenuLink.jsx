import { useContext } from "react";
import { Link } from "react-router-dom";
import { NavbarContext } from "../../contexts/navbar-context.jsx";
// Componente para renderizar un enlace en el menú de navegación
export function NavbarMenuLink({ to, children, className }) {
    // Obtener el método closeMenu del contexto NavbarContext
    const { closeMenu } = useContext(NavbarContext);
    return (
        <li>
            {/* Enlace que redirige a la ruta especificada y cierra el menú */}
            <Link to={to} onClick={closeMenu} className={className}>
                {children}
            </Link>
        </li>
    );
}
