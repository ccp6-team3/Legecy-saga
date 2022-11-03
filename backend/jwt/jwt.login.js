require("dotenv").config({ path: "../../.env.local" });
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { getAllUsers, getUserByEmail } = require("../middleware/model");

let refreshTokens = [];

router.post("/login", async (req, res) => {
  const { userEmail, userPassword } = req.body;
  let allUsers = [];

  await getAllUsers().then((data) => {
    return (allUsers = data);
  });

  let user = allUsers.find((user) => {
    return user.userEmail === userEmail;
  });

  let isMatch 
    = await bcrypt.compare(userPassword, user.userPassword);
  // if (userPassword === user.userPassword) isMatch = true;


  if (!isMatch) {
    return res.send("Email or password is invalid");
  }

  const accessToken = await jwt.sign({ userEmail }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1m",
  });

  const refreshToken = await jwt.sign({ userEmail }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "5m",
  });

  refreshTokens.push(refreshToken);

  res.send({
    accessToken,
    refreshToken,
  });
});

module.exports = router;
