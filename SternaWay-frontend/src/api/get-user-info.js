import { fetchAPI } from "./fetch-api.js";

export async function getUserInfo(userid) {
    return await fetchAPI("/user/info/" + userid);
}
