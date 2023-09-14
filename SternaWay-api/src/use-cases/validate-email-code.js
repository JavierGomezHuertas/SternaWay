const dbService = require("../services/db-service.js");
const errorService = require("../services/error-service.js");

module.exports = async (userEmail, code) => {
  //checkear primero si el usuario existe
  const user = await dbService.getUserByEmail(userEmail);
  if (!user) {
    errorService.notFound();
  }
  //obtener el código de validación
  const dbCode = await dbService.getValidationCodeByUserId(user.id);

  //checkear si el código de validación es correcto
  if (dbCode.code != code) {
    errorService.invalidValidationCode();
  }
  //Si es correcto borrar el código de validación de la DB
  await dbService.deleteValidationCode(dbCode.id);

  // y actualizar el usuario marcando su emailValidated = true
  await dbService.setEmailValidated(user.id);
};
