import { getToken } from "../utils/get-token.js";

export const deleteImageOnServer = async (postId, photoId) => {
    try {
        await fetch(`${host}/posts/${postId}/photos/${photoId}`, {
            method: "DELETE",
            headers: {
                authorization: getToken(),
            },
        });
    } catch (error) {
        console.error("Error deleting post photo:", error);
        throw error;
    }
};

const host = import.meta.env.VITE_API_HOST;
