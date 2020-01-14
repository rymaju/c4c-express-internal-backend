const router = require("express").Router();
let User = require("../models/user.model");

const authenticate = require("../utils/auth");

router.route("/users").get((req, res) => {
  const fullToken = req.headers.authorization || "";
  const token = fullToken.split(" ")[1];

  authenticate(req, res, decoded => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
