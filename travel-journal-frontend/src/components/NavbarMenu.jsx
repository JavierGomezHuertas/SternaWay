import { useContext } from "react";
import { LogoutContext } from "../contexts/auth-context.jsx";
import { NavbarContext } from "../contexts/navbar-context.jsx";
import { useCurrentUser } from "../hooks/use-current-user.js";
import { NavbarMenuLink } from "./navbar/NavbarMenuLink.jsx";
import { UserLink } from "./users/UserLink.jsx";
import { NavbarMenuAction } from "./navbar/NavbarMenuAction.jsx";
// Definir el componente
export function NavbarMenu() {
    // Obtener el usuario actual
    const currentUser = useCurrentUser();
    // Obtener el estado de visibilidad del menú
    const { menuHidden } = useContext(NavbarContext);
    // Obtener la función de cierre de sesión
    const logout = useContext(LogoutContext);
    return (
        <nav
            className="navbarMenu"
            id="hiddenNav"
            style={{
                display: menuHidden ? "none" : "flex",
            }}
        >
            <ul>
                {/* Enlaces del menú */}
                <NavbarMenuLink to="/" className="navbarTitle">
                    Travel Journal
                </NavbarMenuLink>
                <hr />
                {!currentUser ? (
                    // Mostrar enlaces de inicio de sesión y registro si no hay usuario actual
                    <>
                        <NavbarMenuLink to="/">Home</NavbarMenuLink>
                        <NavbarMenuLink to="/login">Log in</NavbarMenuLink>
                        <NavbarMenuLink to="/register">Register</NavbarMenuLink>
                    </>
                ) : (
                    // Mostrar enlaces de inicio de sesión, perfil y publicación si hay un usuario actual
                    <>
                        <NavbarMenuLink to="/">Home</NavbarMenuLink>
                        <NavbarMenuLink to="/profile">
                            <UserLink user={currentUser} />
                            Profile
                        </NavbarMenuLink>
                        <NavbarMenuLink to="/posts/new">
                            New post
                        </NavbarMenuLink>
                        <hr />
                        <NavbarMenuAction action={logout}>
                            Log out
                        </NavbarMenuAction>
                    </>
                )}
            </ul>
        </nav>
    );
}
