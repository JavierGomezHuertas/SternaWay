import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../forms/Button.jsx";
import { Icon } from "../icons/Icon.jsx";
import { useCurrentUser } from "../../hooks/use-current-user.js";
import { sendLike } from "../../api/send-like.js";
import "./LikeButton.css";

export function LikeButton({ post }) {
    const currentUser = useCurrentUser();
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(post.alreadyLiked);
    const [likes, setLikes] = useState(post.likes);
    // Actualizar el estado cuando cambie el post
    useEffect(() => {
        setIsLiked(post.alreadyLiked);
        setLikes(post.likes);
    }, [post]);
    function likePost() {
        // Redirigir al usuario a la página de inicio de sesión si no ha iniciado sesión
        if (!currentUser) {
            navigate("/login");
            return;
        }
        // Enviar el like al servidor
        sendLike(post.id);
        // Actualizar el contador de likes y el estado de isLiked
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    }
    // Agregar la clase "isLiked" si el post ha sido liked
    let classesToAdd = "";
    if (isLiked) {
        classesToAdd = "isLiked";
    }
    return (
        <Button
            className={"likeButton large " + classesToAdd}
            onClick={likePost}
        >
            <Icon name={"Favorite"} />
            <span>{likes}</span>
        </Button>
    );
}
