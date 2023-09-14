import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "./Icon.jsx";
// Función que muestra un botón para volver atrás en la navegación
export function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();
    // Si estamos en la página de inicio, no mostramos el botón
    if (location.pathname === "/") {
        return null;
    }
    // Mostramos el botón con el ícono y el texto "Back"
    return (
        <button
            style={{
                display: "flex",
                alignItems: "center",
            }}
            onClick={() => navigate("..")}
        >
            <Icon name={"arrow_back_ios"} />
            Back
        </button>
    );
}
