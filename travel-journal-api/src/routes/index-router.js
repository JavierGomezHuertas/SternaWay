const { Router } = require("express");
const usersRouter = require("./users-router.js");
const postsRouter = require("./posts-router.js");

const router = Router();

router.use(usersRouter);
router.use(postsRouter);
//agrego mi nuevo router

module.exports = router;
