const dbService = require("../services/db-service.js");
const errorService = require("../services/error-service.js");
const fileService = require("../services/file-service.js");

module.exports = async (postId, photoId, userId) => {
  const post = await dbService.getPostById(postId);
  //checkear que ese post exista
  if (!post) {
    errorService.notFound();
  }
  //checkear si este usuario puede cargarle fotos a ese post.
  if (post.userId != userId) {
    errorService.unauthorizedUser();
  }

  //checkear si existe la foto
  const photo = await dbService.getPhotoById(photoId);
  if (!photo) {
    errorService.notFound();
  }

  //Si la foto no es una foto de ese post
  if (photo.postId != postId) {
    errorService.unauthorizedUser();
  }

  //Borrar la foto de la base de datos
  await dbService.deletePhoto(photoId);

  //Borrar la foto del sistema archivos
  await fileService.deletePhoto(photo);
};
