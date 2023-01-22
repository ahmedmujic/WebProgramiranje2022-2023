const { check } = require("express-validator")
const { POST_TITLE_REQUIRED } = require("../constants/validators/posts-constants");


exports.createPostValidator = [
    check('title')
        .notEmpty()
        .withMessage(POST_TITLE_REQUIRED)
        .bail(),
    (req, res, next) => {
        next();
    }
];