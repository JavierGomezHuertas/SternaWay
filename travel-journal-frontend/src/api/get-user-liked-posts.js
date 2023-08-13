import { fetchAPI } from "./fetch-api.js";

export async function getUserLiked(userId) {
    return await fetchAPI("/user/liked/" + userId);
}
