const { generateUUID } = require("../services/crypto-service.js");
const { savePost } = require("../services/db-service.js");

module.exports = async (currentUserId, postPayload) => {
  //Creo un nuevo post en base al payload, al usuario actual y a un id generado

  const id = generateUUID();

  const newPost = {
    // ...postPayload, //SPREAD OPERATOR
    title: postPayload.title,
    description: postPayload.description,
    place: postPayload.place,
    userId: currentUserId,
    id,
  };

  await savePost(newPost);

  return id;
};
