const { verify } = require('jsonwebtoken');


exports.authMiddleware = async (req, res, next) => {
    const token = req.header('access-token').split('Bearer ')[1];

    if (!token) return res.status(401).json();

    try {
        var payload = await verify(token, process.env.SECRET);
        req.user = payload;
        next()
    } catch (err) {
        return res.status(401).json();
    }
}