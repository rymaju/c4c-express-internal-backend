express = require("express");
cors = require("cors");
https = require("https");
fs = require("fs");
mongoose = require("mongoose");
require("dotenv").config();

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

const publicRouter = require("./routes/public");

app.use("/", publicRouter);

const protectedRouter = require("./routes/protected");

app.use("/protected", protectedRouter);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
