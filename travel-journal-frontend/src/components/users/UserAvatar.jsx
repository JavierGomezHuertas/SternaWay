import "./UserAvatar.css";
// Componente de Avatar de Usuario
export function UserAvatar({ user }) {
    // Devolver el elemento de imagen con la clase "userAvatar"
    return (
        <img
            className="userAvatar"
            src={
                // Usar la URL del avatar del usuario si existe, de lo contrario, generar una URL de avatar en base al nombre del usuario
                user.avatarURL ||
                `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
            }
            alt="Autor"
        />
    );
}
