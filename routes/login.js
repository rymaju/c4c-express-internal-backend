const router = require("express").Router();
let User = require("../models/user.model");

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const authenticate = require("../middleware/auth");

router.route("/login").post((req, res) => {
  const email = req.body.email;
  const plaintextPassword = req.body.password;

  User.findOne(
    { email: email },
    "hashedPassword privilegeLevel",
    (err, user) => {
      if (err) return res.status(400).json("Error: " + err);

      const hashedPassword = user.hashedPassword;
      const userId = user._id;
      const privilegeLevel = user.privilegeLevel;

      bcrypt.compare(plaintextPassword, hashedPassword, (err, isValid) => {
        if (err) return res.status(400).json("Error: " + err);
        if (!isValid) return res.status(401).json("Error: Incorrect password");

        const jti = crypto.randomBytes(16).toString("hex");

        const token = jwt.sign(
          { user_id: userId, privilege_level: privilegeLevel },
          process.env.JWT_SECRET,
          {
            jwtid: jti,
            expiresIn: "1h"
          }
        );

        res.setHeader("Authentication", `Bearer ${token}`);
        res.status(201).json("jwt: " + token);
      });
    }
  );
});

router.route("/signup").post((req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const plaintextPassword = req.body.password;
  const currentYear = req.body.currentYear;
  const major = req.body.major;

  bcrypt.hash(plaintextPassword, saltRounds, function(err, hashedPassword) {
    const newUser = new User({
      email,
      firstName,
      lastName,
      hashedPassword,
      currentYear,
      major
    });

    newUser
      .save()
      .then(() => res.json("User added!"))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

router.route("/logout").post(authenticate(0), function(req, res) {
  console.log("logging out");
  const nowInSeconds = Math.round(Date.now() / 1000);
  tokenCache.set(req.token.jti, "", req.token.exp - nowInSeconds);
  res.status(201).json("Logged out successfully!");
});

module.exports = router;
