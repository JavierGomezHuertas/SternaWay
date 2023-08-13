import { fetchAPI } from "./fetch-api.js";

export async function sendRegister(payload) {
  return await fetchAPI("/users/register", "post", payload);
}
