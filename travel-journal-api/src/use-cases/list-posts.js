const { getAllPosts, likeExists } = require("../services/db-service.js");

module.exports = async (userId, sortBy = "date") => {
    // ir a buscar todos los posts a la DB
    const allPosts = await getAllPosts();

    // Ordenar por criterio: fecha o likes
    if (sortBy === "likes") {
        allPosts.sort((a, b) => b.likes - a.likes); // Ordenar por "likes" en orden descendente
    } else {
        allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Ordenar por fecha en orden descendente
    }

    // Comprobar si el usuario ha dado "like" en cada post (si userId está definido)
    if (userId) {
        const promiseArray = allPosts.map(async (post) => {
            return {
                ...post,
                alreadyLiked: await likeExists(post.id, userId),
            };
        });
        return await Promise.all(promiseArray);
    }

    return allPosts;
};
