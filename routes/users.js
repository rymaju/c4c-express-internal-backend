const router = require("express").Router();
let User = require("../models/user.model");

const authenticate = require("../middleware/auth");
const publicUserData = "email firstName lastName currentYear major";

//Gets all users
//public
router.route("/").get((req, res) => {
  User.find({}, publicUserData)
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//Get a user by ID
//public
router.route("/:id").get(function(req, res, next) {
  User.findById(req.params.id, publicUserData)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error " + err));
});


module.exports = router;
