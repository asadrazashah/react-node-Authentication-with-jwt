const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token ||
    req.headers.authorization ||
    req.headers["authorization"];
  // console.log("token is " + token);

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
    // console.log("no token");
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
        console.log(err);
      } else {
        // console.log("hi");
        // req.email = decoded.email;
        next();
      }
    });
  }
};
module.exports = withAuth;
