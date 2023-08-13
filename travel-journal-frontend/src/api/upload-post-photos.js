import { getToken } from "../utils/get-token.js";

export async function uploadPostPhotos(id, photos) {
  const uploadPromises = photos.map((photo) => {
    return uploadPostPhoto(id, photo);
  });
  const results = await Promise.all(uploadPromises);
  console.log(results);
}

const host = import.meta.env.VITE_API_HOST;

async function uploadPostPhoto(id, photo) {
  const formData = new FormData();
  formData.append("photo", photo);

  const headers = {};
  const token = getToken();
  if (token) {
    headers["authorization"] = token;
  }

  const response = await fetch(host + `/posts/${id}/photos`, {
    method: "post",
    headers,
    body: formData,
  });
  return await response.json();
}
