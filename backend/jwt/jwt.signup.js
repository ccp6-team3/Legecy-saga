require("dotenv").config({ path: "../../.env.local" });
const express = require("express");
const router = express.Router();
const { sendUserData } = require("../middleware/model");

router.post("/signup", async (req, res) => {
  await sendUserData(req.body).then((data) => {
    res.send("signed up completed");
  });
});

module.exports = router;
