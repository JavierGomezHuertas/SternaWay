import { fetchAPI } from "./fetch-api.js";

export async function sendLogin(payload) {
  return await fetchAPI("/users/login", "post", payload);
}
