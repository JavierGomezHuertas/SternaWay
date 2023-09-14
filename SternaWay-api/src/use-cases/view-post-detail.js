const {
  getPostById,
  getCommentsByPostId,
  countLikesByPostId,
  getPhotosByPostId,
  getUserInfoByPostId,
  likeExists,
} = require("../services/db-service.js");
const errorService = require("../services/error-service.js");

/**
 * datos de entrada: postId
 * datos de salida: toda la info del post
 * y todos sus comentarios
 */
module.exports = async (postId, userId) => {
  const post = await getPostById(postId);
  if (!post) {
    errorService.notFound();
  }
  post.user = await getUserInfoByPostId(postId);
  post.comments = await getCommentsByPostId(postId);
  post.photos = await getPhotosByPostId(postId);
  post.likes = await countLikesByPostId(postId);
  if (userId) {
    post.alreadyLiked = await likeExists(postId, userId);
  }

  return post;
};
