import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);
import { Link, useNavigate } from "react-router-dom";
import { LikeButton } from "./LikeButton.jsx";
import { UserLink } from "../users/UserLink.jsx";
import { CommentButton } from "./CommentButton.jsx";
import { Button } from "../forms/Button.jsx";
import "./PostCard.css";

const host = import.meta.env.VITE_API_HOST;

// Función para mostrar un componente de tarjeta de publicación
export function PostCard({ post }) {
    // Desestructurar las propiedades del objeto post
    const { id, title, mainImage, user, createdAt, place } = post;
    // Mostrar la fecha de creación
    const date = dayjs(createdAt);
    // Obtener la función navigate de react-router-dom
    const navigate = useNavigate();

    function handleNavigateToUserPosts(userId) {
        navigate(`/user/profile/${userId}`);
    }

    function handleNavigateToSearchPlace(place) {
        navigate(`/search?q=${place}`);
    }

    return (
        // Renderizar la tarjeta de publicación
        <article className="card">
            <img
                className="cardImage"
                src={
                    mainImage?.startsWith("http")
                        ? mainImage
                        : `${host}/${mainImage}`
                }
                alt="Imagen del post"
            />
            <section className="cardAuthor">
                <Button className="link-profile" onClick={() => handleNavigateToUserPosts(user.id)}>
                    <UserLink user={user} />
                </Button>
                <Button className="link-place" onClick={() => handleNavigateToSearchPlace(place)}>
                    <p className="postPlace">{place}</p>
                </Button>
            </section>
            <Link to={`/posts/${id}`}>
                <h3 className="cardTitle">{title}</h3>
                <p className="text-xs text-slate-600">{date.fromNow()}</p>
            </Link>
            <section className="cardActions">
                <LikeButton post={post} />
                <CommentButton
                    commentsCount={post.comments}
                    onClick={() => {
                        navigate(`/posts/${post.id}`);
                    }}
                />
            </section>
        </article>
    );
}
