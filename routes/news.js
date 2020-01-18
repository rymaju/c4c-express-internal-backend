const router = require("express").Router();
let News = require("../models/news.model");

const authenticate = require("../middleware/auth");

//Gets all news posts
//public
router.route("/").get((req, res) => {
  News.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});

//Get a news post by ID
//public
router.route("/:id").get(function(req, res, next) {
  News.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json("Error " + err));
});
//Create a news post
//Requires level 1 privileges
router.route("/").post(authenticate(1), function(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  const datePublished = Date.parse(req.body.datePublished);
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;

  const newNews = new News({
    title,
    description,
    author,
    datePublished,
    content,
    imageUrl
  });

  newNews
    .save()
    .then(() => res.json("News post added!"))
    .catch(err => res.status(400).json("Error: " + err));
});
//Update a news post by ID
//Requires level 1 privileges
router.route("/:id").put(authenticate(1), function(req, res, next) {
  News.findById(req.params.id)
    .then(post => {
      post.title = req.body.title;
      post.description = req.body.description;
      post.author = req.body.author;
      post.datePublished = Date.parse(req.body.datePublished);
      post.content = req.body.content;
      post.imageUrl = req.body.imageUrl;
      post
        .save()
        .then(() => res.json("News post updated."))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error " + err));
});
//Delete a news post by ID
//Requires level 1 privileges
router.route("/:id").delete(authenticate(1), function(req, res, next) {
  News.findByIdAndDelete(req.params.id)
    .then(post => res.json("News post deleted."))
    .catch(err => res.status(400).json("Error " + err));
});

module.exports = router;
