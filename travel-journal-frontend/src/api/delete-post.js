import { fetchAPI } from "./fetch-api.js";

export async function deletePost(id) {
    return await fetchAPI(`/posts/${id}`, "DELETE");
}
