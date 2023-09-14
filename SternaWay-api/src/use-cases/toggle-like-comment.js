const { generateUUID } = require("../services/crypto-service.js");
const {
    likeCommentExists,
    deleteCommentLikeByUserId,
    createCommentLike,
    getCommentById,
} = require("../services/db-service.js");

module.exports = async (commentId, userId) => {
    const comment = await getCommentById(commentId);
    if (!comment) {
        errorService.notFound();
    }

    if (await likeCommentExists(commentId, userId)) {
        await deleteCommentLikeByUserId(commentId, userId);
    } else {
        await createCommentLike({
            id: generateUUID(),
            commentId,
            userId,
        });
    }
};
