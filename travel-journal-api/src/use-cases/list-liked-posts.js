const { getAllPosts, likeExists } = require("../services/db-service.js");

module.exports = async (userId) => {
    try {
        // Obtener todos los posts
        const allPosts = await getAllPosts();

        const userLikedPosts = await Promise.all(
            allPosts.map(async (post) => {
                const alreadyLiked = await likeExists(post.id, userId);
                return alreadyLiked ? post : null;
            })
        );

        // Filtrar los posts que el usuario dio "like")
        const likedPosts = userLikedPosts.filter((post) => post !== null);

        return likedPosts;
    } catch (error) {
        console.error("Error al obtener los posts liked por el usuario", error);
        throw error;
    }
};
