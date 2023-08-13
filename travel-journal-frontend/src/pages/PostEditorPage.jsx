import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../api/get-post-detail";
import { PostEditor } from "../components/posts/PostEditor";

export function PostEditorPage() {
    const { id } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        getPostDetail(id).then((post) => {
            setPost(post);
        });
    }, [id]);

    // Renderiza el editor solo si ya cargó el post
    return post ? <PostEditor post={post} /> : <p>Loading...</p>;
}
