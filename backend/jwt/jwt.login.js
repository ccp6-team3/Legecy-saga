require("dotenv").config({ path: "../../.env.local" });
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../middleware/model");

router.use(express.json());

router.post("/login", async (req, res) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  
  await getUserByEmail(userEmail).then((data) => {
    if (data.userEmail === userEmail && data.userPassword === userPassword) {
      const payload = {
        userEmail: userEmail,
      };
      const secret = process.env.SECRET_KEY;
      const options = {
        algorithm: "HS256",
        expiresIn: "20m",
      };
      const token = jwt.sign(payload, secret, options);

      res.json({
        isSuccess: true,
        token: token,
      });
    } else {
      res.json({
        isSuccess: false,
        message: "wrong email adress or password",
      });
    }
  });
});

module.exports = router;
