import { useEffect, useState } from "react";
import { getUserPosts } from "../../api/get-user-posts.js";
import { getAllPosts } from "../../api/get-all-posts.js";
import { useCurrentUser } from "../../hooks/use-current-user.js";
import { Icon } from "../icons/Icon.jsx";

export function TotalPosts({ userId }) {
    const currentUser = useCurrentUser();
    const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                if (userId) {
                    // Si se proporciona userId, obtén los posts del usuario específico
                    const posts = await getUserPosts(userId);
                    const postsCreatedByUser = posts.filter(
                        (post) => post.user.id === userId
                    );
                    setTotalPosts(postsCreatedByUser.length);
                } else if (currentUser) {
                    // Si no se proporciona userId pero hay un usuario actual, obtén los posts del usuario actual
                    const allPosts = await getAllPosts();
                    const postsCreatedByUser = allPosts.filter(
                        (post) => post.user.id === currentUser.id
                    );
                    setTotalPosts(postsCreatedByUser.length);
                }
            } catch (error) {
                console.error("Error al obtener el total de posts", error);
            }
        }

        fetchUserPosts();
    }, [userId, currentUser]);

    return (
        <article className="cart">
            <Icon name={"Location_On"} />
            {totalPosts}
            <p> places posted</p>
        </article>
    );
}
