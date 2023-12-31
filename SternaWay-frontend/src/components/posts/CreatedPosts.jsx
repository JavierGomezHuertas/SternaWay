import { useEffect, useState, useCallback } from "react";
import { PostCard } from "./PostCard.jsx";
import { getUserPosts } from "../../api/get-user-posts.js";
import { getAllPosts } from "../../api/get-all-posts.js"; 
import { useCurrentUser } from "../../hooks/use-current-user.js";
import { PageSubtitle2 } from "../utils/PageSubtitle2.jsx";
import { getUserInfo } from "../../api/get-user-info.js";

export function CreatedPosts({ userId }) {
    const currentUser = useCurrentUser();
    const [userPosts, setUserPosts] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const fetchPosts = useCallback(async () => {
        try {
            let posts = [];

            if (userId) {
                // Si se proporciona userId, obtén los posts del usuario
                posts = await getUserPosts(userId);
                const user = await getUserInfo(userId);
                setUserInfo(user); 
            } else if (currentUser) {
                // Si no se proporciona userId pero hay un usuario actual, obtén los posts creados por el usuario actual
                const allPosts = await getAllPosts("date");
                posts = allPosts.filter(
                    (post) => post.user.id === currentUser.id
                );
            }

            setUserPosts(posts);
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
                {userId
                    ? `${userInfo ? userInfo[0].name : "User"}'s Travels`
                    : `${currentUser ? currentUser.name : "My"}'s Travels`}
            </PageSubtitle2>
            {userPosts ? (
                userPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    Cargando tus posts...
                </div>
            )}
        </section>
    );
}
