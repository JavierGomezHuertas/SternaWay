const dbService = require("../services/db-service.js");
const errorService = require("../services/error-service.js");
const fileService = require("../services/file-service.js");

/**
 * datos de entrada:
 *  - userId (ID del usuario actual)
 *  - avatarImage (imagen del avatar)
 */
module.exports = async (userId, avatarImage) => {
    // Verificar que el usuario actual sea igual al ID enviado
    if (userId !== avatarImage.userId) {
        errorService.unauthorizedUser(
            "No tienes permiso para cambiar el avatar de este usuario"
        );
        return;
    }

    // Verificar que el usuario existe
    const user = await dbService.getUserById(userId);
    if (!user) {
        errorService.notFound("Usuario no encontrado");
        return;
    }

    // Verificar que la imagen del avatar sea válida (puedes agregar más validaciones según tus necesidades)
    if (!avatarImage || !isValidImage(avatarImage)) {
        errorService.badRequest("La imagen del avatar no es válida");
        return;
    }

    // Guardar el archivo del avatar en el sistema de archivos
    const avatarURL = await fileService.saveAvatar(userId, avatarImage);

    // Actualizar la URL del avatar en la base de datos del usuario
    await dbService.updateUserAvatar(userId, avatarURL);

    // Devolver la URL del avatar actualizada
    return avatarURL;
};

// Función para validar la imagen (puedes personalizar esto según tus necesidades)
function isValidImage(image) {
    // Aquí puedes realizar validaciones como verificar el tipo de archivo, tamaño, etc.
    // Por ejemplo, puedes usar una biblioteca como 'file-type' para verificar el tipo de archivo.
    return true; // Implementa tus validaciones aquí
}
