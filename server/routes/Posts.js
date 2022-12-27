const express = require("express")
const router = express.Router()
const { Posts } = require("../models")
const { validationResult, body } = require("express-validator")
const { validateToken } = require("../middlewares/auth-middleware")
const { createPostValidator } = require("../validators/posts")

router.get("/", async (req, res) => {
    const posts = await Posts.findAll();
    res.json(posts);
});

router.get("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post ?? {});
});

router.post("/", createPostValidator, async (req, res) => {
    const errors = validationResult(req);
    const user = req.user;

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const body = req.body;
    body.authorId = user.id;
    await Posts.create(body);
    res.status(201).json();
})

module.exports = router;