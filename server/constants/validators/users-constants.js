const USER_USERNAME_REQUIRED = "Username is required!";
const USER_PASSWORD_REQUIRED = "Password is required!";
USER_ALREADY_EXISTS = (username) => `User with username ${username} already exists.`

module.exports = {
    USER_USERNAME_REQUIRED,
    USER_PASSWORD_REQUIRED,
    USER_ALREADY_EXISTS
}