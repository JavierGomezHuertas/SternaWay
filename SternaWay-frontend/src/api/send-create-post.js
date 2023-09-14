import { fetchAPI } from "./fetch-api.js";
console.log();
export function sendCreatePost(payload) {
  return fetchAPI("/posts", "post", payload);
}
