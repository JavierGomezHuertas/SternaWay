import { useState } from "react";
import { NavbarMenu } from "../NavbarMenu.jsx";
import { Icon } from "../icons/Icon.jsx";
import { Button } from "../forms/Button.jsx";
import { NavbarContext } from "../../contexts/navbar-context.jsx";
import "./Navbar.css";

export function Navbar() {
    // Estado para controlar si el menú está oculto o no
    const [menuHidden, setMenuHidden] = useState(true);
    // Función para alternar la visibilidad del menú
    const toggleMenu = () => {
        setMenuHidden(!menuHidden);
    };
    
    return (
        <>
            {/* Fondo oscuro que cubre el resto de la pantalla cuando el menú está visible */}
            <div
                className="backdrop"
                onClick={toggleMenu}
                style={{
                    display: menuHidden ? "none" : "block",
                }}
            ></div>
            <nav className="navbar">
                {/* Botón para abrir/cerrar el menú */}
                <Button onClick={toggleMenu}>
                    <Icon name="menu" className="burgerMenuIcon" />
                </Button>
                {/* Proveedor del contexto del menú */}
                <NavbarContext.Provider
                    value={{
                        menuHidden: menuHidden,
                        closeMenu: () => setMenuHidden(true),
                    }}
                >
                    {/* Componente del menú */}
                    <NavbarMenu />
                </NavbarContext.Provider>
            </nav>
        </>
    );
}
