const { Router, json } = require("express");
const fileUpload = require("express-fileupload");
const listUserPosts = require("../use-cases/list-user-posts");
const createPost = require("../use-cases/create-post.js");
const listPosts = require("../use-cases/list-posts.js");
const addComment = require("../use-cases/add-comment.js");
const viewPostDetail = require("../use-cases/view-post-detail.js");
const sendResponse = require("../utils/send-response.js");
const toggleLike = require("../use-cases/toggle-like.js");
const editPost = require("../use-cases/edit-post.js");
const removePost = require("../use-cases/remove-post.js");
const editComment = require("../use-cases/edit-comment.js");
const removeComment = require("../use-cases/remove-comment.js");
const authGuard = require("../middlewares/auth-guard.js");
const addPhoto = require("../use-cases/add-photo.js");
const removePhoto = require("../use-cases/remove-photo.js");
const handleAsyncError = require("../utils/handle-async-error.js");
const searchPosts = require("../use-cases/search-posts.js");
const listLikedPosts = require("../use-cases/list-liked-posts");

const router = Router();

// C(reate).R(ead).U(pdate).D(elete)
router.get(
    "/posts",
    handleAsyncError(async (req, res) => {
        //Obtener todos los posts
        const posts = await listPosts(req.currentUser?.id);
        sendResponse(res, posts);
    })
);

router.get(
    "/posts/best",
    handleAsyncError(async (req, res) => {
        //Obtener los mejores posts
        const posts = await listPosts(req.currentUser?.id, "likes");
        sendResponse(res, posts);
    })
);

router.get(
    "/user/liked/:userId",
    handleAsyncError(async (req, res) => {
        //Obtener los post que el usuario dio like
        const userId = req.params.userId;
        const posts = await listLikedPosts(userId, "likes");
        sendResponse(res, posts);
    })
);

http: router.get(
    "/search",
    handleAsyncError(async (req, res) => {
        //Obtener todos los posts
        console.log(req.query);
        const posts = await searchPosts(req.query);
        sendResponse(res, posts);
    })
);

router.get(
    "/posts/user/:userId",
    handleAsyncError(async (req, res) => {
        //Obtener todos los posts creados por un usuario
        const userId = req.params.userId;
        const posts = await listUserPosts(userId);
        sendResponse(res, posts);
    })
);

router.post(
    "/posts",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        // Crear un nuevo post
        const id = await createPost(req.currentUser.id, req.body);
        sendResponse(res, { id }, 201);
    })
);
router.patch(
    "/posts/edit/:id",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        // Editar el post con id req.params.id
        await editPost(req.params.id, req.currentUser.id, req.body);
        sendResponse(res);
    })
);
router.get(
    "/posts/:id",
    handleAsyncError(async (req, res) => {
        // Obtener el post con id req.params.id
        const post = await viewPostDetail(req.params.id, req.currentUser?.id);
        sendResponse(res, post);
    })
);
router.delete(
    "/posts/:id",
    authGuard,
    handleAsyncError(async (req, res) => {
        const postId = req.params.id;
        const userId = req.currentUser.id;
        //Borrar el post con id req.params.id
        await removePost(postId, userId);
        sendResponse(res);
    })
);
router.post(
    "/posts/:id/like",
    authGuard,
    handleAsyncError(async (req, res) => {
        //Hacer toggle del like en el post con id req.params.id
        await toggleLike(req.params.id, req.currentUser.id);
        sendResponse(res);
    })
);
router.post(
    "/posts/:id/comments",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        //Agregar un nuevo comentario al post con id req.params.id
        await addComment(req.params.id, req.currentUser.id, req.body);
        sendResponse(res, undefined, 201);
    })
);
router.patch(
    "/posts/:id/comments/:commentId",
    authGuard,
    json(),
    handleAsyncError(async (req, res) => {
        //Modificar el comentario con id req.params.commentId en el post con id req.params.id
        await editComment(req.params.commentId, req.currentUser.id, req.body);
        sendResponse(res);
    })
);
router.delete(
    "/posts/:id/comments/:commentId",
    authGuard,
    handleAsyncError(async (req, res) => {
        //Borrar el comentario con id req.params.commentId en el post con id
        await removeComment(req.params.commentId, req.currentUser.id);
        sendResponse(res);
    })
);
router.post(
    "/posts/:id/photos",
    authGuard,
    fileUpload(),
    handleAsyncError(async (req, res) => {
        //Agregar una nueva foto al post con id
        await addPhoto(req.params.id, req.currentUser.id, req.files.photo);

        sendResponse(res);
    })
);
router.delete(
    "/posts/:id/photos/:photoId",
    authGuard,
    handleAsyncError(async (req, res) => {
        //Eliminar la foto con id req.params.photoId del post con id req.params.id
        await removePhoto(
            req.params.id,
            req.params.photoId,
            req.currentUser.id
        );
        sendResponse(res);
    })
);

module.exports = router;
