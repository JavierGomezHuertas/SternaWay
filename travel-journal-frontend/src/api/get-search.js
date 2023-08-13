import { fetchAPI } from "./fetch-api.js";

export async function getSearch(search, orderby, order) {
    return await fetchAPI("/search", "get", { search, orderby, order });
}
