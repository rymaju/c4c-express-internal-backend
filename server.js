express = require("express");
cors = require("cors");
https = require("https");
fs = require("fs");
mongoose = require("mongoose");
require("dotenv").config();

const NodeCache = require("node-cache");

tokenCache = new NodeCache({ checkperiod: 600 }); //clear the cache of expired tokens every 10 minutes

const app = express();
const port = process.env.PORT || 8443;
const uri = process.env.ATLAS_URI;
const sslOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
  passphrase: process.env.SSL_PASSPHRASE
};

app.use(cors()); // Here we can whitelist our frontend
app.use(express.json());
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("database connection successful!");
});

const publicRouter = require("./routes/login");

app.use("/", publicRouter);

const eventsRouter = require("./routes/events");

app.use("/events", eventsRouter);

const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

if (process.env.HEROKU) {
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
