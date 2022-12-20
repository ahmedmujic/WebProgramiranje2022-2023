const express = require("express")
const router = express.Router()
const { Posts } = require("../models")
const { validationResult, body } = require("express-validator")
const { createPostValidator } = require("../validators/posts")

router.get("/", async (req, res) => {
    const posts = await Posts.findAll();
    res.json(posts);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.post("/", createPostValidator, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const body = req.body;
    await Posts.create(body);
    res.status(201).json();
})

module.exports = router;