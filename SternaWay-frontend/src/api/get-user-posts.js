import { fetchAPI } from "./fetch-api.js";

export async function getUserPosts(userid) {
    return await fetchAPI("/posts/user/" + userid);
}
