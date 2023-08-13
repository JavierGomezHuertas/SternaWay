const { Router, json } = require("express");
const registerUser = require("../use-cases/register-user.js");
const loginUser = require("../use-cases/login-user.js");
const sendResponse = require("../utils/send-response.js");
const authGuard = require("../middlewares/auth-guard.js");
const validateEmailCode = require("../use-cases/validate-email-code.js");
const registerPayload = require("../validators/register-payload.js");
const validateBody = require("../middlewares/validate-body.js");
const loginPayload = require("../validators/login-payload.js");
const handleAsyncError = require("../utils/handle-async-error.js");
const userInfo = require("../use-cases/user-info.js")

const router = Router();

router.post(
    "/users/register",
    json(),
    validateBody(registerPayload),
    handleAsyncError(async (req, res) => {
        await registerUser(req.body);
        sendResponse(res);
    })
);

router.post(
    "/users/login",
    json(),
    validateBody(loginPayload),
    handleAsyncError(async (req, res) => {
        //Loguea el usuario y devuelve un token de login
        const token = await loginUser(req.body);
        sendResponse(res, {
            token,
        });
    })
);

router.post(
    "/users/validate-email",
    json(),
    handleAsyncError(async (req, res) => {
        const { email, code } = req.body;
        await validateEmailCode(email, code);
        sendResponse(res);
    })
);

router.get(
    "/user/info/:userId",
    handleAsyncError(async (req, res) => {
    // Obtener el usuario con userId
        const userId = req.params.userId;
        const userinfoData = await userInfo(userId);
        sendResponse(res, userinfoData);
    })
);

router.get("/users/:id", authGuard, (req, res) => {
    // Obtener el usuario con id req.params.id
    res.send("Detalle usuario");
});
router.get("/users", authGuard, (req, res) => {
    // Obtener todos los usuarios (solo para admins)
    res.send("Listado usuarios");
});
router.patch("/users/:id", authGuard, json(), (req, res) => {
    // Modificar datos del usuario (solo para el propio usuario, o para el admin)
    res.json(req.body);
});

module.exports = router;
