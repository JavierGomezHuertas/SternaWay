const { getPostsByUserId, likeExists } = require("../services/db-service.js");

module.exports = async (userId, sortBy = "date") => {
    const userPosts = await getPostsByUserId(userId, sortBy);

    // Comprobar si el usuario ha dado "like" en cada post
    if (userId) {
        const promiseArray = userPosts.map(async (post) => {
            return {
                ...post,
                alreadyLiked: await likeExists(post.id, userId),
            };
        });
        return await Promise.all(promiseArray);
    }

    return userPosts;
};
