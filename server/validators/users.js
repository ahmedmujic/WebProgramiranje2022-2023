const { check } = require("express-validator")
const {
    USER_USERNAME_REQUIRED,
    USER_PASSWORD_REQUIRED,
    USER_ALREADY_EXISTS
 } = require("../constants/validators/users-constants");
const { Users } = require("../models");

exports.createUserValidator = [
    check('username')
        .notEmpty()
        .withMessage(USER_USERNAME_REQUIRED)
        .custom(async value => {
            const user = await Users.findOne({ where: { username: value } });
            if(user != null){
                return Promise.reject(USER_ALREADY_EXISTS(value));
            }
        })
        .bail()
    ,
    check('password')
        .notEmpty()
        .withMessage(USER_PASSWORD_REQUIRED)
        .bail(),
    (req, res, next) => {
        next();
    }
];