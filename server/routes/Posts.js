const express = require("express")
const router = express.Router()
const { Posts, Users } = require("../models")
const { validationResult } = require("express-validator")
const { authMiddleware } = require("../middlewares/auth-middleware")
const { adminMiddleware } = require("../middlewares/admin-middleware")
const { createPostValidator } = require("../validators/posts")

router.get("/", authMiddleware, async (req, res) => {
    const posts = await Posts.findAll({include: Users, where: {authorId: req.user.id}});
    res.json(posts);
});

router.get("/all", adminMiddleware, async (req, res) => {
    const posts = await Posts.findAll();
    res.json(posts);
});

router.get("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post ?? {});
});

router.post("/", authMiddleware, createPostValidator, async (req, res) => {
    const errors = validationResult(req);
    const user = req.user;

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const body = req.body;
    body.authorId = user.id;
    console.log(body)
    await Posts.create(body);
    res.status(201).json();
})

module.exports = router;