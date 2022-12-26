const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("access-token");

  if (!accessToken) return res.status(401).json();

  try {
    const validToken = verify(accessToken.split("Bearer ")[1], process.env.SECRET);
    req.user = validToken;
    if (validToken) {
      return next();
    }else{
        return res.status(401).json();
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { validateToken };