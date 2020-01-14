const jwt = require("jsonwebtoken");

function authenticate(req, res, callback) {
  const fullToken = req.headers.authorization || "";
  const token = fullToken.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(401).json("Error: " + err);
    if (tokenCache.has(decoded.jti))
      return res.status(401).json("Error: blacklisted token");

    callback(decoded);
  });
}

module.exports = authenticate;
