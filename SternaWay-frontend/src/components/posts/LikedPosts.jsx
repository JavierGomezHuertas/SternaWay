import { useEffect, useState, useCallback } from "react";
import { PostCard } from "./PostCard.jsx";
import { getUserLiked } from "../../api/get-user-liked-posts.js";
import { getBestPosts } from "../../api/get-best-posts.js";
import { useCurrentUser } from "../../hooks/use-current-user.js";
import { PageSubtitle2 } from "../utils/PageSubtitle2.jsx";
import { getUserInfo } from "../../api/get-user-info.js";

export function LikedPosts({ userId }) {
    const currentUser = useCurrentUser();
    const [likedPosts, setLikedPosts] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [showAllPosts, setShowAllPosts] = useState(false);
    const postsToShowInitially = 3;

    const fetchPosts = useCallback(async () => {
        try {
            let posts = [];

            if (userId) {
                // Si se proporciona userId, obtén los posts que le gustan a ese usuario
                posts = await getUserLiked(userId);
                const user = await getUserInfo(userId);
                setUserInfo(user);
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

    const handleShowMoreClick = () => {
        setShowAllPosts(true);
    };

    return (
        <section className="container itemsPosts4">
            <PageSubtitle2>
                {userId
                    ? `${userInfo ? userInfo[0].name : "User"}'s Favorites`
                    : `${currentUser ? currentUser.name : "My"}'s Favorites`}
            </PageSubtitle2>
            {likedPosts.length > 0 ? (
                likedPosts
                    .slice(
                        0,
                        showAllPosts ? likedPosts.length : postsToShowInitially
                    )
                    .map((post) => <PostCard key={post.id} post={post} />)
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
            {!showAllPosts && likedPosts.length > postsToShowInitially && (
                <button onClick={handleShowMoreClick}>Ver más</button>
            )}
        </section>
    );
}
