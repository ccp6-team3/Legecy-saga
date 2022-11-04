require("dotenv").config({ path: "../../.env.local" });
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { getAllUsers, sendUserData } = require("../middleware/model");

router.post("/signup", async (req, res) => {
  let allUsers = [];

  await getAllUsers().then((data) => {
    return (allUsers = data);
  });

  let user = allUsers.find((user) => {
    return user.userEmail === req.body.userEmail;
  });

  if (user) {
    res.status(200).send({
      email: user.userEmail,
      message: "This email adress already signed",
    });
  }

  bcryptPassword = bcrypt.hashSync(req.body.userPassword, 10);
  req.body.userPassword = bcryptPassword;

  await sendUserData(req.body).then((data) => {
    res.status(201).send({
      message: "Data transmission completed!",
      auth: { email: req.body.userEmail, password: req.body.userPassword },
    });
  });
});

module.exports = router;
