// Importaciones
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageSubtitle2 } from "../components/utils/PageSubtitle2.jsx";
import { Spinner } from "../components/icons/Spinner.jsx";
import { PostCard } from "../components/posts/PostCard.jsx";
import { getSearch } from "../api/get-search.js";
import { SearchBar } from "../components/utils/SearchBar.jsx";
export function SearchPage() {
    // Estados
    const [searching, setSearching] = useState(false);
    const [foundPosts, setFoundPosts] = useState([]);
    // Obtener parámetros de búsqueda
    const [queryParams] = useSearchParams();
    useEffect(() => {
        // Función de búsqueda
        async function doSearch() {
            const search = queryParams.get("q");
            const orderby = queryParams.get("orderby");
            const order = queryParams.get("order");
            if (search) {
                setSearching(true);
                try {
                    const posts = await getSearch(search, orderby, order);
                    setFoundPosts(posts);
                } catch (err) {
                    console.error(err);
                }
                setSearching(false);
            } else {
                setFoundPosts([]);
            }
        }
        // Ejecutar búsqueda al cargar la página o al cambiar los parámetros de búsqueda
        doSearch();
    }, [queryParams]);
    return (
        <section className="container itemsPosts2">
            {/* Barra de búsqueda */}
            <SearchBar />
            {/* Subtítulo de resultados de búsqueda */}
            <PageSubtitle2>Search Results</PageSubtitle2>
            {/* Mostrar resultados de búsqueda si no se está buscando */}
            {!searching &&
                foundPosts.map((post) => {
                    return <PostCard key={post.id} post={post} />;
                })}
            {/* Mostrar mensaje si no se encontraron resultados */}
            {!searching && foundPosts.length === 0 && (
                <p
                    style={{
                        textAlign: "center",
                    }}
                >
                    No se encontraron resultados para tu búsqueda
                </p>
            )}
            {/* Mostrar spinner de carga si se está buscando */}
            {searching && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Spinner /> Cargando resultados...
                </div>
            )}
        </section>
    );
}
