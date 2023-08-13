const { deletePost } = require("../services/db-service.js");

module.exports = async (postId) => {

  await deletePost(postId);
};
