const router = require("express").Router();
let User = require("../models/user.model");

const authenticate = require("../middleware/auth");

router.route("/events").get(authenticate(0), (req, res) => {
  const fullToken = req.headers.authorization || "";
  const token = fullToken.split(" ")[1];

  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json("Error: " + err));
});

router
  .route("/events/:id")
  .get(function(req, res, next) {
    Event.findById(req.params.id)
      .then(event => res.json(event))
      .catch(err => res.status(400).json("Error " + err));
  })
  .post(function(req, res, next) {
    const name = req.body.name;
    const eventDate = Date.parse(req.body.eventDate);
    const eventCode = req.body.eventCode;
    const isOpen = req.body.isOpen;
    const attendees = attendees;

    const newExercise = new Exercise({
      name,
      eventDate,
      eventCode,
      isOpen,
      attendees
    });

    newExercise
      .save()
      .then(() => res.json("Exercise added!"))
      .catch(err => res.status(400).json("Error: " + err));
  })
  .put(function(req, res, next) {
    Event.findById(req.params.id)
      .then(event => {
        user.username = req.body.username;
        user.description = req.body.description;
        user.duration = req.body.duration;
        user.date = Date.parse(req.body.date);
        user
          .save()
          .then(() => res.json("Exercise updated."))
          .catch(err => res.status(400).json("Error: " + err));
      })
      .catch(err => res.status(400).json("Error " + err));
  })

  .delete(function(req, res, next) {
    Exercise.findByIdAndDelete(req.params.id)
      .then(exercise => res.json("Exercise deleted."))
      .catch(err => res.status(400).json("Error " + err));
  });

module.exports = router;
