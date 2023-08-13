import { useEffect, useState, useCallback } from "react";
import { PostCard } from "./PostCard.jsx";
import { getUserLiked } from "../../api/get-user-liked-posts.js";
import { getBestPosts } from "../../api/get-best-posts.js"; // Asegúrate de importar correctamente
import { useCurrentUser } from "../../hooks/use-current-user.js";
import { PageSubtitle2 } from "../utils/PageSubtitle2.jsx";

export function LikedPosts({ userId }) {
    const currentUser = useCurrentUser();
    const [likedPosts, setLikedPosts] = useState(null);

    const fetchPosts = useCallback(async () => {
        try {
            let posts = [];

            if (userId) {
                // Si se proporciona userId, obtén los posts que le gustan a ese usuario
                posts = await getUserLiked(userId);
            } else if (currentUser) {
                // Si no se proporciona userId pero hay un usuario actual, obtén los posts que le gustan al usuario actual
                posts = await getBestPosts("likes");
                posts = posts.filter((post) => post.alreadyLiked === true);
            }

            setLikedPosts(posts);
        } catch (error) {
            console.error("Error al obtener los posts", error);
        }
    }, [userId, currentUser]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return (
        <section className="container itemsPosts4">
            <PageSubtitle2>
                {userId ? "User Liked Travels" : "Liked Travels"}
            </PageSubtitle2>
            {likedPosts ? (
                likedPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    Cargando posts...
                </div>
            )}
        </section>
    );
}
