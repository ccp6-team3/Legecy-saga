require("dotenv").config({ path: "../../.env.local" });
const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const token = req.body.accessToken;

  if (token) {
    const secret = process.env.SECRET_KEY;

    await jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          isSuccess: false,
          message: "Invalid token",
        });
      } else {
        req.userEmail = decoded.userEmail;
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
