import { fetchAPI } from "./fetch-api.js";

export async function sendComment(postId, payload) {
  return await fetchAPI(`/posts/${postId}/comments`, "post", payload);
}
