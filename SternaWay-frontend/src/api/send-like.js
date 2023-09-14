import { fetchAPI } from "./fetch-api.js";

export async function sendLike(postId) {
  return await fetchAPI(`/posts/${postId}/like`, "post");
}
