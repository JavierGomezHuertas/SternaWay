import { fetchAPI } from "./fetch-api.js";

export async function deleteComment(postId, commentId) {
    return await fetchAPI(`/posts/${postId}/comments/${commentId}`, "DELETE");
}
