const router = require("express").Router();
let User = require("../models/user.model");

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 10;

jwt = require("jsonwebtoken");

require("dotenv").config();

router.route("/").get((req, res) => {
  Apartment.find()
    .then(apartments => res.json(apartments))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  const email = req.body.email;
  const plaintextPassword = req.body.password;

  User.findOne({ email: email }, "_id hashedPassword", (err, user) => {
    if (err) return res.status(400).json("Error: " + err);

    const hashedPassword = user.hashedPassword;
    const userId = user._id;

    bcrypt.compare(plaintextPassword, hashedPassword, (err, isValid) => {
      if (err) return res.status(400).json("Error: " + err);
      if (!isValid) return res.status(401).json("Error: Incorrect password");

      const jti = crypto.randomBytes(16).toString("hex");

      const token = jwt.sign({ user_id: userId }, process.env.JWT_SECRET, {
        jwtid: jti,
        expiresIn: "1h"
      });

      res.setHeader("Authentication", `Bearer ${token}`);
      res.status(201).json("jwt: " + token);
    });
  });
});

module.exports = router;
