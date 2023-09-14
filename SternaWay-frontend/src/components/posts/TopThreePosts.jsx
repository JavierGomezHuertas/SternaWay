import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "./PostCard.jsx";
import { getBestPosts } from "../../api/get-best-posts.js";
import { useCurrentUser } from "../../hooks/use-current-user.js";
import { PageSubtitle2 } from "../utils/PageSubtitle2.jsx";

export function TopThreePosts() {
    const currentUser = useCurrentUser();
    const [topThreePosts, setTopThreePosts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los mejores posts desde la API
        getBestPosts()
            .then((apiPosts) => {
                // Tomar solo los tres primeros posts
                const topThree = apiPosts.slice(0, 3);
                setTopThreePosts(topThree);
            })
            .catch(() => {
                setTopThreePosts([]);
                // TODO: Mostrar notificación de error
            });
    }, [currentUser]);

    const handleShowMoreClick = () => {
        // Navegar a la ruta "/bestposts" al hacer clic en "Ver más"
        navigate("/bestposts");
    };

    return (
        <section className="container itemsPosts3">
            <PageSubtitle2>Top Travels</PageSubtitle2>
            {topThreePosts ? (
                topThreePosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                ></div>
            )}
            <button onClick={handleShowMoreClick}>Ver más</button>
        </section>
    );
}
