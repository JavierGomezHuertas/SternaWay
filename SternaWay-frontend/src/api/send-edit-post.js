import { fetchAPI } from "./fetch-api.js";

export async function sendEditPost(postId, userId, postData) {
    return fetchAPI(`/posts/edit/${postId}`, "PATCH", { userId, ...postData });
}
