# SternaWay

SternaWay es una API para una aplicación estilo red social, donde los usuarios pueden compartir sus experiencias de viaje, con fotos, comentarios y valoraciones.

- [Funcionalidades](#funcionalidades)
- [Diseño](#dise%C3%B1o)
- [Diagrama de la DB](#diagrama-de-la-db)
- [Instalación](#instalaci%C3%B3n)
- [Ejecución](#ejecuci%C3%B3n)

## Funcionalidades

- [x] Los usuarios se pueden registrar
- [x] Los usuarios se pueden loguear
- [x] Los usuarios pueden crear experiencias de viaje
- [x] Los usuarios pueden editar sus experiencias de viaje
- [x] Los usuarios pueden eliminar sus experiencias de viaje
- [x] Los usuarios pueden subir fotos a sus experiencias de viaje
- [x] Los usuarios pueden eliminar fotos de sus experiencias de viaje
- [x] Los usuarios pueden ver todas las experiencias de viaje publicadas
- [x] Los usuarios pueden valorar las experiencias de viaje de otros usuarios
- [x] Los usuarios pueden comentar las experiencias de viaje de otros usuarios
- [x] Los usuarios pueden eliminar sus comentarios
- [x] Los usuarios pueden editar sus comentarios
- [ ] Los admins pueden eliminar las experiencias de viaje de los usuarios
- [ ] Los admins pueden eliminar los comentarios de los usuarios
- [ ] Los admins pueden eliminar los usuarios

## Diseño

![SternaWay Design](./docs/dise%C3%B1o-api.excalidraw.svg)

## Diagrama de la DB

![SternaWay DB](./docs/dise%C3%B1o-db.excalidraw.svg)

## Instalación

1. Copiar .env.example a .env y configurar las variables de entorno

2. Instalar dependencias y crear la base de datos:

```bash
npm install
npm run initDb
```

## Ejecución

```bash
npm start
```

## Tareas pendientes

- [x] Implementar sistema de errores en [`errors-service.js`](./src/services/errors-service.js).
- [x] Asegurar que los usuarios no puedan editar o eliminar experiencias de viaje de otros usuarios, validando en cada caso de uso que el usuario que realiza la acción es el dueño de la experiencia de viaje. Lo mismo para los comentarios y los likes.
- [x] Implementar subida de archivos con [`express-fileupload`](https://www.npmjs.com/package/express-fileupload)
- [x] Implementar procesamiento de imágenes con [`sharp`](https://www.npmjs.com/package/sharp)
- [ ] Implementar validación de emails.
- [ ] Implementar validación de datos de entrada.
- [ ] Implementar datos de prueba en `seed-db.js`
- [ ] Modularizar [`db-service.js`](./src/services/db-service.js) en varios archivos, por ejemplo: `users-repository.js` y `posts-repository.js`.
- [ ] Agregar testing automatizado para los casos de uso y los servicios.
