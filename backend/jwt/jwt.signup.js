require("dotenv").config({ path: "../../.env.local" });
const express = require("express");
const router = express.Router();
const { sendUserData } = require("../middleware/model");

router.use(express.json());

router.post("/signupin", async (req, res) => {
  await sendUserData(req.body).then(data => {
    res.send(data);
  })
});

module.exports = router;
