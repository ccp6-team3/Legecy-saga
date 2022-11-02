const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (token) {
    const secret = process.env.SECRET_KEY;

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          isSuccess: false,
          message: "Invalid token",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      isSuccess: false,
      message: "Token not found",
    });
  }
};

module.exports = authToken;
