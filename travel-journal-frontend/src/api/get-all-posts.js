import { fetchAPI } from "./fetch-api.js";

export async function getAllPosts() {
    return await fetchAPI("/posts");
}
