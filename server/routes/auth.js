const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { Users } = require('../models')
const { createUserValidator, userLoginValidator } = require('../validators/users')
const { validationResult } = require('express-validator')
const { authMiddleware } = require('../middlewares/auth-middleware')

router.post("/register", createUserValidator, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.errors[0]);
    }

    const { username, password } = req.body;
    let hash = await bcrypt.hash(password, 10);

    await Users.create({
        username: username,
        password: hash
    });
    return res.status(201).json();
});

router.post('/login', userLoginValidator, async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json();
    }

    const user = await Users.findOne({ where: { username: username } });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const token = sign({
            id: user.id,
            username: user.username
        }, process.env.SECRET);

        return res.status(200).json({
            accessToken: token,
            username: user.username,
            id: user.id
        })
    }

    return res.status(401).json()
})

router.get('/user', authMiddleware, async (req, res)=> {
    const user = req.user;
    return res.status(200).json({
        id: user.id,
        username: user.username
    })
})

module.exports = router;