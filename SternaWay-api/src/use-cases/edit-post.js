const { getPostById, updatePost } = require("../services/db-service.js");
const errorService = require("../services/error-service.js");

/**
 * datos de entrada:
 *  - postPayload
 *  - userId
 *
 * datos de salida: nada
 *
 * Actualiza un post existente con los datos de postPayload
 */
module.exports = async (postId, userId, postPayload) => {
  const post = await getPostById(postId);

  if (!post) {
    errorService.notFound();
  }

  if (post.userId != userId) {
    errorService.unauthorizedUser();
  }
  

  const updatedPost = {
    ...post,
    title: postPayload.title,
    description: postPayload.description,
    place: postPayload.place,
  };

  await updatePost(updatedPost);
};
