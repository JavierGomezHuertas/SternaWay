import { UserAvatar } from "./UserAvatar.jsx";
import "./UserLink.css";
// Definir la función UserLink que recibe un objeto user como argumento
export function UserLink({ user }) {
    return (
        <div className="userLink">
            {/* Renderizar el componente UserAvatar y pasarle el objeto user como prop */}
            <UserAvatar user={user} />
            {/* Renderizar un párrafo con la clase "flex-grow" y mostrar el nombre del usuario */}
            <p className="flex-grow">{user.name}</p>
        </div>
    );
}
