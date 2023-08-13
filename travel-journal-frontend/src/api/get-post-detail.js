import { fetchAPI } from "./fetch-api.js";

export async function getPostDetail(id) {
  return await fetchAPI("/posts/" + id);
}
