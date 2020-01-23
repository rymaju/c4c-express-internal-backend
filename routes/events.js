const router = require("express").Router();
let Event = require("../models/event.model");

const authenticate = require("../middleware/auth");

//Gets all events
//public
router.route("/").get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json("Error: " + err));
});

//Get an event by ID
//public
router.route("/:id").get(function(req, res, next) {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json("Error " + err));
});
//Create an event
//Requires level 1 privileges
router.route("/").post(authenticate(1), function(req, res, next) {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const description = req.body.description;
  const eventDate = Date.parse(req.body.eventDate);
  const eventCode = req.body.eventCode;
  const isOpen = req.body.isOpen;

  const newEvent = new Event({
    title,
    subtitle,
    description,
    eventDate,
    eventCode,
    isOpen
  });

  newEvent
    .save()
    .then(() => res.json("Event added!"))
    .catch(err => res.status(400).json("Error: " + err));
});
//Update an event by ID
//Requires level 1 privileges
router.route("/:id").put(authenticate(1), function(req, res, next) {
  Event.findById(req.params.id)
    .then(event => {
      event.title = req.body.title;
      event.subtitle = req.body.subtitle;
      event.description = req.body.description;
      event.eventDate = Date.parse(req.body.eventDate);
      event.eventCode = req.body.eventCode;
      event.isOpen = req.body.isOpen;
      event
        .save()
        .then(() => res.json("Event updated."))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error " + err));
});
//Delete an event by ID
//Requires level 1 privileges
router.route("/:id").delete(authenticate(1), function(req, res, next) {
  Event.findByIdAndDelete(req.params.id)
    .then(event => res.json("Event deleted."))
    .catch(err => res.status(400).json("Error " + err));
});

//Check-in by Event code
//Requires level 0 privileges
//Checks in the user with the userId accociated with this JWT to the event matching the given event code
router.route("/checkin/:code").post(authenticate(0), function(req, res, next) {
  Event.findOne({ eventCode: req.params.code })
    .then(event => {
      if (!event.isOpen) throw "event is not open for check in";
      console.log(req.token.user_id);
      event.attendees.push(req.token.user_id);
      event
        .save()
        .then(() => res.json("Checked in to event successfully."))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error " + err));
});

module.exports = router;
