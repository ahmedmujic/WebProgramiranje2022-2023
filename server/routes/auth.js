const express = require("express")
const router = express.Router()
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/auth-middleware");
const { sign } = require("jsonwebtoken");
const { createUserValidator } = require("../validators/users")
const { validationResult } = require("express-validator")

router.post("/register", createUserValidator, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const { username, password } = req.body;
    let hash = await bcrypt.hash(password, 10);
    await Users.create({
        username: username,
        password: hash,
    });
    return res.status(201).json();
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.status(200).json({ error: "User doesn't exist" });

    let match = await bcrypt.compare(password, user.password)

    if(match){
        const accessToken = sign(
            { username: user.username, id: user.id },
            process.env.SECRET
        );
        return res.status(200).json({ token: accessToken, username: username, id: user.id });
    }

    return res.status(401);
});

module.exports = router;