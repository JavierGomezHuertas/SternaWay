const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

/**
 * Escala la imagen a 720p
 * y la convierte a webp
 *
 * guarda el archivo en la carpeta public
 */
module.exports = {
  async processUploadedPostPhoto(postId, photoId, photoFile) {
    //guardar el archivo en el disco
    //    - ¿donde lo guardo?
    //    - ¿cómo se va a llamar?
    // fs.writeFile(string|buffer)
    // construir una URL válida de este servidor que referencie a ese archivo

    //directorio donde guardaremos la foto
    const directory = path.join(__dirname, "../../public/photos", postId);
    // nombre original en: photo.name
    // path.extname -> devuelve la extension del archivo (ej: .jpg)

    //asegurar que el directorio de destino exista
    await fs.mkdir(directory, {
      recursive: true,
    });

    //nombre final del archivo nuevo
    const fileName = photoId + ".webp";

    //la ruta absoluta al archivo en el sistema de archivos
    const filePath = path.join(directory, fileName);

    //procesar el archivo y escribirlo
    const sharpProcess = await sharp(photoFile.data);
    const metadata = await sharpProcess.metadata();

    if (metadata.width > 1080) {
      sharpProcess.resize(720);
    }
    sharpProcess.webp().toFile(filePath);

    //genero URL del archivo para express
    const fileURL = `/photos/${postId}/${fileName}`;

    return fileURL;
  },
  /**
   * @param dbPhoto - Photo from Database
   */
  async deletePhoto(dbPhoto) {
    const directory = path.join(__dirname, "../../public");
    // /photos/{postId}/{photoId}.{extension}
    const filePath = path.join(directory, dbPhoto.imageURL);
    await fs.unlink(filePath);
  },

  /**
   *
   * Borrar todas las fotos de este post
   */
  async deletePostPhotos(photoId) {},
};
