import { fetchAPI } from "./fetch-api.js";

export async function getBestPosts() {
    return await fetchAPI("/posts/best");
}
