require("dotenv").config({ path: "../../.env.local" });
const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const token = req.body.accessToken;

  if (token) {
    const secret = process.env.SECRET_KEY;

    await jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(403).send({
          error: "Invalid token"
        });
      } else {
        req.userEmail = decoded.userEmail;
        next();
      }
    });
  } else {
    res.status(404).send({
      error: "Token not found"
    });
  }
};

module.exports = authToken;
