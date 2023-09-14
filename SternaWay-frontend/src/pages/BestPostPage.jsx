// Importaciones
import { useEffect, useState } from "react";
import { PostCard } from "../components/posts/PostCard.jsx";
import { getBestPosts } from "../api/get-best-posts.js";
import { useCurrentUser } from "../hooks/use-current-user.js";
import { PageSubtitle2 } from "../components/utils/PageSubtitle2.jsx";
import { Spinner } from "../components/icons/Spinner.jsx";
import { SearchBar } from "../components/utils/SearchBar.jsx";
// Definir la página
export function BestPostsPage() {
    // Obtener el usuario actual y los mejores posts
    const currentUser = useCurrentUser();
    const [bestPosts, setBestPosts] = useState(null);
    // Obtener los mejores posts de la API
    useEffect(() => {
        getBestPosts()
            .then((apiPosts) => setBestPosts(apiPosts))
            .catch(() => {
                setBestPosts([]);
                // TODO: Mostrar notificación de error
            });
    }, [currentUser]);
    // Mostrar la página de los mejores posts
    return (
        <section className="container itemsPosts2">
            {/* Mostrar la barra de búsqueda */}
            <SearchBar />
            {/* Mostrar el título de la página */}
            <PageSubtitle2>Best Travels</PageSubtitle2>
            {/* Mostrar los posts ordenados por likes */}
            {bestPosts &&
                bestPosts.map((post) => <PostCard key={post.id} post={post} />)}
            {/* Mostrar un spinner mientras se cargan los posts */}
            {!bestPosts && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Spinner /> Cargando posts...
                </div>
            )}
        </section>
    );
}
