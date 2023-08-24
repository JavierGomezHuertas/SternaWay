const { deletePost, getPostById } = require("../services/db-service.js");
const errorService = require("../services/error-service.js");

module.exports = async (postId, userId) => {
    const post = await getPostById(postId);

    if (!post) {
        errorService.notFound();
    }

    if (post.userId !== userId) {
        errorService.unauthorizedUser();
    }

    await deletePost(postId);
};
