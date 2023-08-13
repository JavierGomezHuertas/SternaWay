import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail } from "../api/get-post-detail.js";
import { useEffect, useState } from "react";
import { UserLink } from "../components/users/UserLink.jsx";
import { PageSubtitle2 } from "../components/utils/PageSubtitle2.jsx";
import { deletePost } from "../api/delete-post.js";
import "./PostDetailPage.css";
import { LikeButton } from "../components/posts/LikeButton.jsx";
import { CommentButton } from "../components/posts/CommentButton.jsx";
import { useCurrentUser } from "../hooks/use-current-user.js";
import { Button } from "../components/forms/Button.jsx";
import { sendComment } from "../api/send-comment.js";
import { FormInput } from "../components/forms/FormInput.jsx";
import { Form } from "../components/forms/Form.jsx";
import { ConfirmModal } from "../components/posts/ConfirmModal.jsx";

const host = import.meta.env.VITE_API_HOST;

export function PostDetailPage() {
    const { id } = useParams();
    const [currentPost, setCurrentPost] = useState(null);
    const [commentInput, setCommentInput] = useState("");
    const currentUser = useCurrentUser();
    const [isPostAuthor, setIsPostAuthor] = useState(false);
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        getPostDetail(id).then((post) => {
            setCurrentPost(post);
            setIsPostAuthor(currentUser.id === post.userId);
        });
    }, [id, currentUser.id]);

    async function onSubmit() {
        try {
            await sendComment(currentPost.id, {
                comment: commentInput,
            });
            setCommentInput("");
            const post = await getPostDetail(id);
            setCurrentPost(post);
        } catch (err) {
            console.log(err);
        }
    }

    function onCommentButtonClick() {
        const [input] = document.getElementsByName("comment");
        if (input) {
            input.focus();
        }
    }

    if (!currentPost) {
        return "Loading...";
    }

    function openConfirmModal() {
        setShowConfirm(true);
    }

    async function handleConfirm() {
        await deletePost(currentPost.id);

        setShowConfirm(false);
        navigate(-1);
    }

    function handleCancel() {
        setShowConfirm(false);
    }

    function handleEditPost() {
        navigate(`/posts/edit/${currentPost.id}`);
    }

    function handleNavigateToUserPosts() {
        const userId = currentPost.userId;
        navigate(`/user/profile/${userId}`);
    }

    function handleNavigateToCommentUserPosts(userId) {
        navigate(`/user/profile/${userId}`);
    }

    return (
        <>
            <div className="container bottomSeparator">
                <PageSubtitle2>{currentPost.title}</PageSubtitle2>
                    <Button onClick={handleNavigateToUserPosts}>
                        <UserLink user={currentPost.user[0]} />
                    </Button>
                <img className="portrait"
                    src={
                        currentPost.photos[0]?.imageURL?.startsWith("http")
                            ? currentPost.photos[0]?.imageURL
                            : `${host}/${currentPost.photos[0]?.imageURL}`
                    }
                    alt={currentPost.title}
                />
                <section className="postActions">
                    <LikeButton post={currentPost} />
                    <CommentButton
                        commentsCount={currentPost.comments.length}
                        onClick={onCommentButtonClick}
                    />
                </section>
                <p className="postDescription">{currentPost.description}</p>
                {showConfirm && (
                    <ConfirmModal
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )}
                {isPostAuthor && (
                    // Abrir el modal al hacer click
                    <Button onClick={openConfirmModal}>Delete Post</Button>
                )}
                {isPostAuthor && (
                    <Button onClick={handleEditPost}>Edit Post</Button>
                )}
            </div>
            <section className="container">
                <h3 className="commentsTitle">Comments:</h3>
                <ul className="commentsList">
                    {currentPost.comments.map((comment) => {
                        return (
                            <li key={comment.id} className="comment">
                                <Button
                                    onClick={() =>
                                        handleNavigateToCommentUserPosts(
                                            comment.user.id
                                        )
                                    }
                                >
                                    <UserLink user={comment.user} />
                                </Button>
                                <p>{comment.comment}</p>
                            </li>
                        );
                    })}
                </ul>
                {currentUser && (
                    <Form onSubmit={onSubmit}>
                        <FormInput
                            name="comment"
                            placeholder="Leave a new comment..."
                            type="text"
                            value={commentInput}
                            onChange={setCommentInput}
                        />
                        <Button type="submit" className="submit">Post</Button>
                    </Form>
                )}
            </section>
        </>
    );
}
