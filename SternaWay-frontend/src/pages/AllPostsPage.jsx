// Importaciones
import { useEffect, useState } from "react";
import { PostCard } from "../components/posts/PostCard.jsx";
import { getAllPosts } from "../api/get-all-posts.js";
import { useCurrentUser } from "../hooks/use-current-user.js";
import { PageSubtitle2 } from "../components/utils/PageSubtitle2.jsx";
import { Spinner } from "../components/icons/Spinner.jsx";
import { SearchBar } from "../components/utils/SearchBar.jsx";
import { TopThreePosts } from "../components/posts/TopThreePosts.jsx";
// Definir la página
export function AllPostsPage() {
    // Obtener el usuario actual y los posts
    const currentUser = useCurrentUser();
    const [posts, setPosts] = useState(null);
    // Obtener los posts de la API
    useEffect(() => {
        getAllPosts()
            .then((apiPosts) => setPosts(apiPosts))
            .catch(() => {
                setPosts([]);
                //TODO: Mostrar notificación de error
            });
    }, [currentUser]);
    // Mostrar la página de los mejores posts
    return (
        <section className="container itemsPosts">
            {/* Mostrar la barra de búsqueda */}
            <SearchBar />
            {/* Mostrar los tres mejores posts */}
            <TopThreePosts />
            {/* Mostrar el título de la página */}
            <PageSubtitle2>Last Travels</PageSubtitle2>
            {/* Mostrar los posts ordenados por fecha */}
            {posts &&
                posts.map((post) => {
                    return <PostCard key={post.id} post={post} />;
                })}
            {/* Mostrar un spinner mientras se cargan los posts */}
            {!posts && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Spinner /> Cargando últimos posts...
                </div>
            )}
        </section>
    );
}
