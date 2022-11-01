const app = require("../server");
const {
  getUserByEmail,
  getUserByUserName
} = require("../model")

app.use(express.json());

app.post("/api/login", (req, res) => {
  if (
    (userName === req.body.userName || userEmail === req.body.userEmail) &&
    userPassword === req.body.password
  ) {
    const payload = {
      userName: req.body.userName,
    };
    const secret = process.env.SECRET_KEY;

    const options = {
      algorithm: "HS256",
      expiresIn: "20m",
    };

    const token = jwt.sign(payload, secret, options);

    res.send({
      isSuccess: true,
      token: token,
    });
  } else {
    res.send({
      isSuccess: false,
      message: "error on username or email or password",
    });
  }
});
