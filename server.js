express = require("express");
cors = require("cors");
https = require("https");
fs = require("fs");
mongoose = require("mongoose");
require("dotenv").config();

const NodeCache = require("node-cache");
tokenCache = new NodeCache({ checkperiod: 600 }); //global token cache, automatically clears the cache of expired tokens every 10 minutes

const app = express();
const port = process.env.PORT || 8443;
const uri = process.env.ATLAS_URI;
const sslOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
  passphrase: process.env.SSL_PASSPHRASE
};
const apiDocsLink =
  "https://github.com/rymaju/c4c-express-internal-backend/blob/master/api.md";

app.use(cors()); // Here we can whitelist our frontend
app.use(express.json()); // Built in body-parser for reading request JSON bodies

// connect to the db
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("connected to the database successfuly!");
});

const publicRouter = require("./routes/login");
app.use("/", publicRouter);

const eventsRouter = require("./routes/events");
app.use("/events", eventsRouter);

const newsRouter = require("./routes/news");
app.use("/news", newsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.get("/", function(req, res) {
  res.send(`<a href="${apiDocsLink}">API Docs</a>`);
});

if (process.env.HEROKU == "true") {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port} with Heroku`);
  });
} else {
  https.createServer(sslOptions, app).listen(port, () => {
    console.log(
      `Server is listening on port ${port} with our own certificates`
    );
  });
}
