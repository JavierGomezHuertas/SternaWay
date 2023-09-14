import { fetchAPI } from "./fetch-api.js";

export async function sendEditComment(postId, commentId, commentData) {
    const updatedComment = await fetchAPI(
        `/posts/${postId}/comments/${commentId}`,
        "PATCH",
        {
            comment: commentData.text,
        }
    );

    return updatedComment;
}
