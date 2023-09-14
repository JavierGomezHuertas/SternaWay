const cryptoService = require("../services/crypto-service.js");
const dbService = require("../services/db-service.js");
const errorService = require("../services/error-service.js");
const fileService = require("../services/file-service.js");

/**
 * datos de entrada:
 *  - id del usuario
 *  - id del post
 *  - la foto
 */
module.exports = async (postId, userId, photo) => {
  const post = await dbService.getPostById(postId);
  //checkear que ese post exista
  if (!post) {
    errorService.notFound();
  }
  //checkear si este usuario puede cargarle fotos a ese post.
  if (post.userId != userId) {
    errorService.unauthorizedUser();
  }

  //generar id para la foto
  const id = cryptoService.generateUUID();

  //guardar el archivo en el disco
  const url = await fileService.processUploadedPostPhoto(postId, id, photo);

  //crear una nueva "post photo" y guardarla en la base de datos.
  await dbService.savePhoto({
    id: id,
    imageURL: url,
    postId: postId,
  });
};
