const jwt = require("jsonwebtoken");

// authenticate : Request Response function(Object) -> void
// async function that will extract and verify JWT is valid and not blacklisted
// and calls callback with the decoded JWT object passed as only argument
// or responds with appropriate error if not

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

/*
Example:

...

  authenticate(req, res, (decoded) => {
    //if this callback is called that means everything is ok

    //you can extract values from decoded like so:

    const jti = decoded.jti;
    const iat = decoded.iat;

    //and use req and res as you would normally do

    res.status(200).json("Congrats! You are authorized to view this!")

  });

...

*/

module.exports = authenticate;
