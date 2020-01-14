const router = require("express").Router();
let User = require("../models/user.model");

const jwt = require("jsonwebtoken");

router.route("/users").get((req, res) => {
  const fullToken = req.headers.authorization || "";
  const token = fullToken.split(" ")[1];
  console.log(token);
  console.log(process.env.JWT_SECRET);
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(401).json("Error: " + err);

    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
