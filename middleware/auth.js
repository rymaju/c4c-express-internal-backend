const jwt = require("jsonwebtoken");

// authenticate : int  -> function(req, res, next)

function authenticate(requiredPrivilegeLevel) {
  let token;
  return (req, res, next) => {
    try {
      console.log("verifying");

      token = req.headers.authorization.split(" ")[1];
      console.log(jwt.decode(token).exp);
      console.log(Math.round(Date.now() / 1000));
      console.log(jwt.decode(token).exp - Math.round(Date.now() / 1000));
    } catch (err) {
      return res.status(401).json("Error: " + err);
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) return res.status(401).json("Error: " + err);
      if (tokenCache.has(decoded.jti))
        return res.status(401).json("Error: blacklisted token");

      console.log(
        decoded.privilege_level + ", should be < " + requiredPrivilegeLevel
      );
      if (decoded.privilege_level < requiredPrivilegeLevel)
        return res
          .status(401)
          .json("Error: insufficent privilege to access this resource");
      console.log("made it");
      req.token = decoded;
      next();
    });
  };
}

module.exports = authenticate;
