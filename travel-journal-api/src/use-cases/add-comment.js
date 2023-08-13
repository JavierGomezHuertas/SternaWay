const cryptoService = require("../services/crypto-service.js");
const dbService = require("../services/db-service.js");

/**
 * datos de entrada:
 *  - postId: string
 *  - currentUserId: string
 *  - comment: string
 *
 * datos de salida:
 *  - éxito
 *  - o no
 *
 * crea el comentario asociado al post y al usuario
 * y lo guarda en la base de datos.
 */
module.exports = async (postId, currentUserId, commentPayload) => {
  const post = await dbService.getPostById(postId);
  //checkear que ese post exista
  if (!post) {
    errorService.notFound();
  }

  const newComment = {
    postId,
    userId: currentUserId,
    comment: commentPayload.comment,
    id: cryptoService.generateUUID(),
  };

  await dbService.saveComment(newComment);
};
