const express = require("express");
const { getUserByEmail } = require("../middleware/model");
const router = express.Router();
const authToken = require("../middleware/authToken");

router.use(express.json());

router.post("/user", authToken, async (req, res) => {
  await getUserByEmail(req.userEmail).then((data) => {
    res.send(data);
  });
});

module.exports = router;
