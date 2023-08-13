import { fetchAPI } from "./fetch-api.js";

export async function sendEditPost(postId, postData) {
    return fetchAPI(`/posts/edit/${postId}`, "PATCH", postData);
}
