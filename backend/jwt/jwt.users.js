const express = require("express");
const { getUserByEmail } = require("../middleware/model");
const router = express.Router();
const authToken = require("../middleware/authToken");

router.use(express.json());

router.get("/users", authToken, async (req, res) => {
  await getUserByEmail(req.decoded.userEmail).then((data) => {
    res.send(data);
  });
});

module.exports = router;
