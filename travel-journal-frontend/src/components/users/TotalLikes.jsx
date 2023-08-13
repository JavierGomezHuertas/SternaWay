import { useEffect, useState } from "react";
import { getUserPosts } from "../../api/get-user-posts.js";
import { useCurrentUser } from "../../hooks/use-current-user.js";
import { Icon } from "../icons/Icon.jsx";
import "../posts/LikeButton.css";

export function TotalLikes({ userId }) {
    const currentUser = useCurrentUser();
    const [totalLikes, setTotalLikes] = useState(0);

    useEffect(() => {
        async function fetchPosts() {
            try {
                if (userId) {
                    // Si se proporciona userId, obtén los posts del usuario específico
                    const posts = await getUserPosts(userId);
                    const likesSum = posts.reduce(
                        (total, post) => total + post.likes,
                        0
                    );
                    setTotalLikes(likesSum);
                } else if (currentUser) {
                    // Si no se proporciona userId pero hay un usuario actual, obtén los posts del usuario actual
                    const posts = await getUserPosts(currentUser.id);
                    const likesSum = posts.reduce(
                        (total, post) => total + post.likes,
                        0
                    );
                    setTotalLikes(likesSum);
                }
            } catch (error) {
                console.error("Error al obtener el total de likes", error);
            }
        }

        fetchPosts();
    }, [userId, currentUser]);

    return (
        <article className="cart">
            <Icon name={"Favorite"} className="isLiked" />
            {totalLikes}
            <p> likes received</p>
        </article>
    );
}
