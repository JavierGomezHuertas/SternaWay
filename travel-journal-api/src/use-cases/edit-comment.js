const dbService = require("../services/db-service.js");
const errorService = require("../services/error-service.js");

module.exports = async (commentId, userId, commentPayload) => {
  //Obtener el comentario con id "commentId"
  const comment = await dbService.getCommentById(commentId);

  if (!comment) {
    errorService.notFound();
  }

  //Comparar el id del token (userId) con el userID del comentario
  // Si no son iguales, tirar un error
  if (comment.userId != userId) {
    errorService.unauthorizedUser();
  }
  await dbService.updateComment(commentId, commentPayload);
};
