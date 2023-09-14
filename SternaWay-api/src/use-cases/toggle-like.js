const { generateUUID } = require("../services/crypto-service.js");
const {
  likeExists,
  deleteLikeByUserId,
  createLike,
  getPostById,
} = require("../services/db-service.js");

/**
 * datos de entrada:
 *  - postId
 *  - userId
 *
 * datos de salida: nada
 *
 * Agrega un like al post, o lo quita si ya existe
 */
module.exports = async (postId, userId) => {
  const post = await getPostById(postId);
  if (!post) {
    errorService.notFound();
  }
  // if (post.userId == userId) {
  //   errorService.unauthorizedUser();
  // }

  if (await likeExists(postId, userId)) {
    await deleteLikeByUserId(postId, userId);
  } else {
    await createLike({
      id: generateUUID(),
      postId,
      userId,
    });
  }
};
